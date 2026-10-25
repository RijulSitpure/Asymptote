class Solution:
    def encode(self, num: int) -> str:
        return bin(num + 1)[3:]

def test():
    sol = Solution()
    assert sol.encode(23) == "1000", "test 1 failed"
    assert sol.encode(107) == "101100", "test 2 failed"
    assert sol.encode(0) == "", "test 3 failed"
    print("✓ encode-number passed")

if __name__ == "__main__":
    test()
