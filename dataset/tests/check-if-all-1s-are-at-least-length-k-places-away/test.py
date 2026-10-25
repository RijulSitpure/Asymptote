class Solution:
    def kLengthApart(self, nums: list[int], k: int) -> bool:
        prev = -float("inf")
        for i, x in enumerate(nums):
            if x == 1:
                if i - prev - 1 < k:
                    return False
                prev = i
        return True

def test():
    sol = Solution()
    assert sol.kLengthApart([1,0,0,0,1,0,0,1], 2) == True, "test 1 failed"
    assert sol.kLengthApart([1,0,0,1,0,1], 2) == False, "test 2 failed"
    print("✓ check-if-all-1s-are-at-least-length-k-places-away passed")

if __name__ == "__main__":
    test()
