class Solution:
    def findKthBit(self, n: int, k: int) -> str:
        if n == 1:
            return "0"
        mid = 1 << (n - 1)
        if k == mid:
            return "1"
        elif k < mid:
            return self.findKthBit(n - 1, k)
        else:
            mirrored = (1 << n) - k
            bit = self.findKthBit(n - 1, mirrored)
            return "1" if bit == "0" else "0"

def test():
    sol = Solution()
    assert sol.findKthBit(3, 1) == "0", "test 1 failed"
    assert sol.findKthBit(4, 11) == "1", "test 2 failed"
    print("✓ find-kth-bit-in-nth-binary-string passed")

if __name__ == "__main__":
    test()
