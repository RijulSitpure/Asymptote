class Solution:
    def findKthPositive(self, arr: list[int], k: int) -> int:
        low, high = 0, len(arr) - 1
        while low <= high:
            mid = (low + high) // 2
            missing = arr[mid] - (mid + 1)
            if missing < k:
                low = mid + 1
            else:
                high = mid - 1
        return low + k

def test():
    sol = Solution()
    assert sol.findKthPositive([2,3,4,7,11], 5) == 9, "test 1 failed"
    assert sol.findKthPositive([1,2,3,4], 2) == 6, "test 2 failed"
    print("✓ kth-missing-positive-number passed")

if __name__ == "__main__":
    test()
