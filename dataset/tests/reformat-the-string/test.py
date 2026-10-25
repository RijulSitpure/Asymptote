class Solution:
    def reformat(self, s: str) -> str:
        letters = [c for c in s if c.isalpha()]
        digits = [c for c in s if c.isdigit()]
        if abs(len(letters) - len(digits)) > 1:
            return ""
        if len(digits) > len(letters):
            first, second = digits, letters
        else:
            first, second = letters, digits
        res = []
        for i in range(len(first)):
            res.append(first[i])
            if i < len(second):
                res.append(second[i])
        return "".join(res)

def test():
    sol = Solution()
    assert sol.reformat("a0b1c2") == "a0b1c2", "test 1 failed"
    assert sol.reformat("leetcode") == "", "test 2 failed"
    assert sol.reformat("1229857369") == "", "test 3 failed"
    print("✓ reformat-the-string passed")

if __name__ == "__main__":
    test()
