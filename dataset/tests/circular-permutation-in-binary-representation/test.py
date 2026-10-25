class Solution:
    def circularPermutation(self, n: int, start: int) -> list[int]:
        return [start ^ (i ^ (i >> 1)) for i in range(1 << n)]

def test():
    sol = Solution()
    res1 = sol.circularPermutation(2, 3)
    assert res1[0] == 3, "test 1 failed"
    assert len(res1) == 4, "test 1 len failed"
    for i in range(4):
        diff = bin(res1[i] ^ res1[(i + 1) % 4]).count('1')
        assert diff == 1, f"test 1 adj diff failed at {i}"
    print("✓ circular-permutation-in-binary-representation passed")

if __name__ == "__main__":
    test()
