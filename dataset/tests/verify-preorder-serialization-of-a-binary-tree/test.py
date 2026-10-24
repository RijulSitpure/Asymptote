import sys

class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        slots = 1
        for node in preorder.split(","):
            slots -= 1
            if slots < 0:
                return False
            if node != "#":
                slots += 2
        return slots == 0

def test():
    sol = Solution()
    assert sol.isValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#") is True, "test 1 failed"
    assert sol.isValidSerialization("1,#") is False, "test 2 failed"
    assert sol.isValidSerialization("9,#,#,1") is False, "test 3 failed"
    print("✓ verify-preorder-serialization-of-a-binary-tree passed")

if __name__ == "__main__":
    test()
