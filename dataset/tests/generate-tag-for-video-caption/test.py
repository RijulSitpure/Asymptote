import re

class Solution:
    def generateTag(self, caption: str) -> str:
        words = re.findall(r'[a-zA-Z0-9]+', caption)
        if not words:
            return ""
        capitalized = [w.capitalize() for w in words]
        tag = "#" + "".join(capitalized)
        return tag[:100]

def run_tests():
    s = Solution()
    res1 = s.generateTag("hello world video")
    assert res1 == "#HelloWorldVideo", f"Expected #HelloWorldVideo, got {res1}"
    res2 = s.generateTag("   ")
    assert res2 == "", f"Expected '', got {res2}"
    print("3582 generate-tag-for-video-caption PASSED")

if __name__ == "__main__":
    run_tests()
