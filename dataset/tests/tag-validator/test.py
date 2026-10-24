class Solution:
    def isValid(self, code: str) -> bool:
        stack = []
        i = 0
        n = len(code)

        while i < n:
            if i > 0 and not stack:
                return False
            if code.startswith("<![CDATA[", i):
                j = code.find("]]>", i + 9)
                if j == -1:
                    return False
                i = j + 3
            elif code.startswith("</", i):
                j = code.find(">", i + 2)
                if j == -1:
                    return False
                tag = code[i + 2:j]
                if not stack or stack[-1] != tag:
                    return False
                stack.pop()
                i = j + 1
            elif code.startswith("<", i):
                j = code.find(">", i + 1)
                if j == -1:
                    return False
                tag = code[i + 1:j]
                if not (1 <= len(tag) <= 9 and tag.isupper()):
                    return False
                stack.append(tag)
                i = j + 1
            else:
                i += 1

        return len(stack) == 0

def test():
    sol = Solution()
    assert sol.isValid("<DIV>This is the first line <![CDATA[<div>]]></DIV>") == True, "test 1 failed"
    assert sol.isValid("<DIV>>>  ![cdata[]] </DIV>") == True, "test 2 failed"
    assert sol.isValid("<A>  <B> </A>   </B>") == False, "test 3 failed"
    print("✓ tag-validator passed")

if __name__ == "__main__":
    test()
