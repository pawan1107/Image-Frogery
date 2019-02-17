import pyexiv2
import json
def get_metadata_image(path):
    metadata = pyexiv2.ImageMetadata(path)
    metadata.read()
    string = ""
    for key in  metadata.exif_keys:
        value = metadata[key].raw_value
        key = key.split(".")[-1]
        if key ==  "MakerNote" or key ==  "PrintImageMatching" or  key ==  "MakerNote":
            continue
        if value != "0" and (key != "Exif.Photo.MakerNote" or key != "Exif.Photo.PrintImageMatching"):
            string += '{"a":"'+key.split(".")[-1]+'","b":"'+value+'"},'

    		# print(key.split(".")[-1] ,"=",value)
    string = string.replace("\\", "/")
    string = "["+string[:-1]+"]"
    # print (string)
    return json.loads(string, strict=False)
