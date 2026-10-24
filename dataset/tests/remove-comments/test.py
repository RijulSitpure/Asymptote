from typing import List

class Solution:
    def removeComments(self, source: List[str]) -> List[str]:
        in_block = False
        ans = []
        newline = []

        for line in source:
            i = 0
            n = len(line)
            while i < n:
                if not in_block and i + 1 < n and line[i:i + 2] == "/*":
                    in_block = True
                    i += 1
                elif in_block and i + 1 < n and line[i:i + 2] == "*/":
                    in_block = False
                    i += 1
                elif not in_block and i + 1 < n and line[i:i + 2] == "//":
                    break
                elif not in_block:
                    newline.append(line[i])
                i += 1
            if not in_block and newline:
                ans.append("".join(newline))
                newline = []

        return ans

def test():
    sol = Solution()
    src1 = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
    exp1 = ["int main()", "{ ", "  ", "int a, b, c;", "a = b + c;", "}"]
    assert sol.removeComments(src1) == exp1, "test 1 failed"
    print("✓ remove-comments passed")

if __name__ == "__main__":
    test()
