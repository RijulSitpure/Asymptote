class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        i = 0
        for j in range(len(typed)):
            if i < len(name) and name[i] == typed[j]:
                i += 1
            elif j == 0 or typed[j] != typed[j - 1]:
                return False
        return i == len(name)

def test():
    sol = Solution()
    assert sol.isLongPressedName("alex", "aaleex") is True, "test 1 failed"
    assert sol.isLongPressedName("saeed", "ssaaedd") is False, "test 2 failed"
    assert sol.isLongPressedName("leelee", "lleeelee") is True, "test 3 failed"
    print("✓ long-pressed-name passed")

if __name__ == "__main__":
    test()
