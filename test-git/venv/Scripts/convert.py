# import sys
# import json
# import xml.etree.ElementTree as ET
# from xml.dom import minidom

# def json_to_jmx(json_file, output_file):
#     # Read the JSON file
#     with open(json_file, 'r') as f:
#         data = json.load(f)

#     # Create the root element
#     test_plan = ET.Element('jmeterTestPlan', version="1.2", properties="5.0", jmeter="5.4.1")

#     # Add the hash tree element
#     hash_tree = ET.SubElement(test_plan, 'hashTree')

#     # Create the test plan element
#     test_plan_element = ET.SubElement(hash_tree, 'TestPlan', guiclass="TestPlanGui", testclass="TestPlan", testname="Test Plan", enabled="true")
    
#     # Add elements to the test plan
#     ET.SubElement(test_plan_element, 'stringProp', name="TestPlan.comments").text = ""
#     ET.SubElement(test_plan_element, 'boolProp', name="TestPlan.functional_mode").text = "false"
#     ET.SubElement(test_plan_element, 'boolProp', name="TestPlan.tearDown_on_shutdown").text = "true"
#     ET.SubElement(test_plan_element, 'boolProp', name="TestPlan.serialize_threadgroups").text = "false"
#     ET.SubElement(test_plan_element, 'elementProp', name="TestPlan.user_defined_variables", elementType="Arguments", guiclass="ArgumentsPanel", testclass="Arguments", testname="User Defined Variables", enabled="true")
#     ET.SubElement(test_plan_element, 'stringProp', name="TestPlan.user_define_classpath").text = ""

#     # Add another hash tree element
#     hash_tree_2 = ET.SubElement(hash_tree, 'hashTree')

#     # Create the thread group element
#     thread_group = ET.SubElement(hash_tree_2, 'ThreadGroup', guiclass="ThreadGroupGui", testclass="ThreadGroup", testname="Thread Group", enabled="true")

#     # Add elements to the thread group
#     ET.SubElement(thread_group, 'stringProp', name="ThreadGroup.on_sample_error").text = "continue"
#     ET.SubElement(thread_group, 'elementProp', name="ThreadGroup.main_controller", elementType="LoopController", guiclass="LoopControlPanel", testclass="LoopController", testname="Loop Controller", enabled="true")
    
#     # Loop controller properties
#     loop_controller = thread_group.find('.//elementProp[@name="ThreadGroup.main_controller"]')
#     ET.SubElement(loop_controller, 'boolProp', name="LoopController.continue_forever").text = "false"
#     ET.SubElement(loop_controller, 'stringProp', name="LoopController.loops").text = "1"

#     # More thread group properties
#     ET.SubElement(thread_group, 'stringProp', name="ThreadGroup.num_threads").text = "1"
#     ET.SubElement(thread_group, 'stringProp', name="ThreadGroup.ramp_time").text = "1"
#     ET.SubElement(thread_group, 'boolProp', name="ThreadGroup.scheduler").text = "false"
#     ET.SubElement(thread_group, 'stringProp', name="ThreadGroup.duration").text = ""
#     ET.SubElement(thread_group, 'stringProp', name="ThreadGroup.delay").text = ""
#     ET.SubElement(thread_group, 'boolProp', name="ThreadGroup.same_user_on_next_iteration").text = "true"

#     # Add another hash tree element
#     hash_tree_3 = ET.SubElement(hash_tree_2, 'hashTree')

#     # Flexible handling of JSON structure
#     if isinstance(data, list):
#         endpoints = data
#     elif isinstance(data, dict):
#         if 'endpoints' in data:
#             endpoints = data['endpoints']
#         elif 'item' in data:
#             endpoints = data['item']
#         else:
#             endpoints = [data]
#     else:
#         raise ValueError("Unsupported JSON structure")

#     base_url = data.get('baseUrl', '') if isinstance(data, dict) else ''

#     # Create HTTP samplers for each endpoint in the JSON data
#     for endpoint in endpoints:
#         name = endpoint.get('name', 'Unnamed Request')
#         request = endpoint.get('request', endpoint)
        
#         http_sampler = ET.SubElement(hash_tree_3, 'HTTPSamplerProxy', guiclass="HttpTestSampleGui", testclass="HTTPSamplerProxy", testname=name, enabled="true")
        
#         # Add elements to the HTTP sampler
#         ET.SubElement(http_sampler, 'elementProp', name="HTTPsampler.Arguments", elementType="Arguments", guiclass="HTTPArgumentsPanel", testclass="Arguments", enabled="true")
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.domain").text = base_url
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.port").text = ""
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.protocol").text = request.get('protocol', 'https')
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.contentEncoding").text = ""
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.path").text = request.get('url', {}).get('path', '')
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.method").text = request.get('method', 'GET')
#         ET.SubElement(http_sampler, 'boolProp', name="HTTPSampler.follow_redirects").text = "true"
#         ET.SubElement(http_sampler, 'boolProp', name="HTTPSampler.auto_redirects").text = "false"
#         ET.SubElement(http_sampler, 'boolProp', name="HTTPSampler.use_keepalive").text = "true"
#         ET.SubElement(http_sampler, 'boolProp', name="HTTPSampler.DO_MULTIPART_POST").text = "false"
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.embedded_url_re").text = ""
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.connect_timeout").text = ""
#         ET.SubElement(http_sampler, 'stringProp', name="HTTPSampler.response_timeout").text = ""
        
#         # Add a hash tree for the HTTP sampler
#         ET.SubElement(hash_tree_3, 'hashTree')

#     # Create the pretty-printed XML string
#     rough_string = ET.tostring(test_plan, 'utf-8')
#     reparsed = minidom.parseString(rough_string)
#     pretty_xml = reparsed.toprettyxml(indent="  ")

#     # Write the XML to the output file
#     with open(output_file, 'w') as f:
#         f.write(pretty_xml)

# if __name__ == "__main__":
#     if len(sys.argv) != 3:
#         print("Usage: python convert.py <input_json_file> <output_jmx_file>")
#         sys.exit(1)
    
#     input_file = sys.argv[1]
#     output_file = sys.argv[2]
#     json_to_jmx(input_file, output_file)
#     print(f"Conversion complete. JMX file saved as {output_file}")
import sys
import json
import xml.etree.ElementTree as ET

def extract_url_parts(url):
    if '//' in url:
        protocol, rest = url.split('//', 1)
        domain, *path = rest.split('/', 1)
    else:
        protocol = ''
        domain, *path = url.split('/', 1)
    return protocol.rstrip(':'), domain, '/'.join(path) if path else ''

def create_http_sampler(item):
    name = item.get('name', 'Unnamed Request')
    sampler = ET.Element("HTTPSamplerProxy", guiclass="HttpTestSampleGui", testclass="HTTPSamplerProxy", testname=name, enabled="true")
    
    elementProp = ET.SubElement(sampler, "elementProp", name="HTTPsampler.Arguments", elementType="Arguments", guiclass="HTTPArgumentsPanel", testclass="Arguments", testname="User Defined Variables", enabled="true")
    ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
    
    request = item.get('request', {})
    if isinstance(request, str):
        url = request
        method = 'GET'
    else:
        url = request.get('url', '')
        if isinstance(url, dict):
            url = url.get('raw', '')
        method = request.get('method', 'GET')
    
    protocol, domain, path = extract_url_parts(url)
    
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.domain").text = domain
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.protocol").text = protocol
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.path").text = path
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.method").text = method
    
    # Add more HTTP Sampler parameters
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.contentEncoding").text = ""
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.port").text = ""
    ET.SubElement(sampler, "boolProp", name="HTTPSampler.follow_redirects").text = "true"
    ET.SubElement(sampler, "boolProp", name="HTTPSampler.auto_redirects").text = "false"
    ET.SubElement(sampler, "boolProp", name="HTTPSampler.use_keepalive").text = "true"
    ET.SubElement(sampler, "boolProp", name="HTTPSampler.DO_MULTIPART_POST").text = "false"
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.embedded_url_re").text = ""
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.connect_timeout").text = ""
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.response_timeout").text = ""
    
    if isinstance(request, dict) and 'body' in request:
        body = request['body']
        if isinstance(body, dict) and 'raw' in body:
            boolProp = ET.SubElement(sampler, "boolProp", name="HTTPSampler.postBodyRaw")
            boolProp.text = "true"
            elementProp = ET.SubElement(sampler, "elementProp", name="HTTPsampler.Arguments", elementType="Arguments")
            collectionProp = ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
            elementProp = ET.SubElement(collectionProp, "elementProp", name="", elementType="HTTPArgument")
            ET.SubElement(elementProp, "boolProp", name="HTTPArgument.always_encode").text = "false"
            ET.SubElement(elementProp, "stringProp", name="Argument.value").text = body['raw']
            ET.SubElement(elementProp, "stringProp", name="Argument.metadata").text = "="
    
    headers = []
    if isinstance(request, dict) and 'header' in request:
        headers = request['header']
    
    if headers:
        headerManager = ET.Element("HeaderManager", guiclass="HeaderPanel", testclass="HeaderManager", testname="HTTP Header Manager", enabled="true")
        collectionProp = ET.SubElement(headerManager, "collectionProp", name="HeaderManager.headers")
        for header in headers:
            elementProp = ET.SubElement(collectionProp, "elementProp", name="", elementType="Header")
            ET.SubElement(elementProp, "stringProp", name="Header.name").text = header.get('key', '')
            ET.SubElement(elementProp, "stringProp", name="Header.value").text = header.get('value', '')
        return [sampler, headerManager]
    
    return [sampler]

def json_to_jmx(json_file, jmx_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    root = ET.Element("jmeterTestPlan", version="1.2", properties="5.0", jmeter="5.4.1")
    hashTree = ET.SubElement(root, "hashTree")
    
    testPlan = ET.SubElement(hashTree, "TestPlan", guiclass="TestPlanGui", testclass="TestPlan", testname="Test Plan", enabled="true")
    ET.SubElement(testPlan, "stringProp", name="TestPlan.comments").text = ""
    ET.SubElement(testPlan, "boolProp", name="TestPlan.functional_mode").text = "false"
    ET.SubElement(testPlan, "boolProp", name="TestPlan.tearDown_on_shutdown").text = "true"
    ET.SubElement(testPlan, "boolProp", name="TestPlan.serialize_threadgroups").text = "false"
    elementProp = ET.SubElement(testPlan, "elementProp", name="TestPlan.user_defined_variables", elementType="Arguments", guiclass="ArgumentsPanel", testclass="Arguments", testname="User Defined Variables", enabled="true")
    ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
    ET.SubElement(testPlan, "stringProp", name="TestPlan.user_define_classpath").text = ""
    
    testPlanHashTree = ET.SubElement(hashTree, "hashTree")
    
    threadGroup = ET.SubElement(testPlanHashTree, "ThreadGroup", guiclass="ThreadGroupGui", testclass="ThreadGroup", testname="Thread Group", enabled="true")
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.on_sample_error").text = "continue"
    elementProp = ET.SubElement(threadGroup, "elementProp", name="ThreadGroup.main_controller", elementType="LoopController", guiclass="LoopControlPanel", testclass="LoopController", testname="Loop Controller", enabled="true")
    ET.SubElement(elementProp, "boolProp", name="LoopController.continue_forever").text = "false"
    ET.SubElement(elementProp, "stringProp", name="LoopController.loops").text = "1"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.num_threads").text = "1"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.ramp_time").text = "1"
    ET.SubElement(threadGroup, "boolProp", name="ThreadGroup.scheduler").text = "false"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.duration").text = ""
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.delay").text = ""
    ET.SubElement(threadGroup, "boolProp", name="ThreadGroup.same_user_on_next_iteration").text = "true"
    
    threadGroupHashTree = ET.SubElement(testPlanHashTree, "hashTree")
    
    def process_items(items):
        for item in items:
            if 'item' in item:
                # This is a folder
                process_items(item['item'])
            else:
                # This is a request
                elements = create_http_sampler(item)
                for element in elements:
                    threadGroupHashTree.append(element)
                    threadGroupHashTree.append(ET.Element("hashTree"))
    
    if 'item' in data:
        process_items(data['item'])
    elif isinstance(data, list):
        process_items(data)
    
    tree = ET.ElementTree(root)
    ET.indent(tree, space="  ", level=0)  # This function is available in Python 3.9+
    tree.write(jmx_file, encoding="UTF-8", xml_declaration=True)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert.py <input_json_file> <output_jmx_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    json_to_jmx(input_file, output_file)
    print(f"Conversion complete. JMX file saved as {output_file}")