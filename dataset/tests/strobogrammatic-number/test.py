import sys

class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        mapping = {"0": "0", "1": "1", "6": "9", "8": "8", "9": "6"}
        left, right = 0, len(num) - 1
        while left <= right:
            if num[left] not in mapping or mapping[num[left]] != num[right]:
                return False
            left += 1
            right -= 1
        return True

def test():
    sol = Solution()
    assert sol.isStrobogrammatic("69") is True, "test 1 failed"
    assert sol.isStrobogrammatic("88") is True, "test 2 failed"
    assert sol.isStrobogrammatic("962") is False, "test 3 failed"
    assert sol.isStrobogrammatic("1") is True, "test 4 failed"
    print("✓ strobogrammatic-number passed")

if __name__ == "__main__":
    test()
