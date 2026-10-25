class Solution:
    def decompressRLElist(self, nums: list[int]) -> list[int]:
        res = []
        for i in range(0, len(nums), 2):
            res.extend([nums[i + 1]] * nums[i])
        return res

def test():
    sol = Solution()
    assert sol.decompressRLElist([1,2,3,4]) == [2,4,4,4], "test 1 failed"
    assert sol.decompressRLElist([1,1,2,3]) == [1,3,3], "test 2 failed"
    print("✓ decompress-run-length-encoded-list passed")

if __name__ == "__main__":
    test()
