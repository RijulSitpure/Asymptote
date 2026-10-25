class Solution:
    def maximum69Number(self, num: int) -> int:
        return int(str(num).replace("6", "9", 1))

def test():
    sol = Solution()
    assert sol.maximum69Number(9669) == 9969, "test 1 failed"
    assert sol.maximum69Number(9996) == 9999, "test 2 failed"
    assert sol.maximum69Number(9999) == 9999, "test 3 failed"
    print("✓ maximum-69-number passed")

if __name__ == "__main__":
    test()
