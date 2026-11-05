class Solution:
    def maxValue(self, n: int, target_idx: int, max_sum: int) -> int:
        def get_sum(peak: int, length: int) -> int:
            if length == 0:
                return 0
            if peak >= length:
                return (2 * peak - length + 1) * length // 2
            return (peak + 1) * peak // 2 + (length - peak)
        
        def is_valid(peak: int) -> bool:
            left_len = target_idx
            right_len = n - 1 - target_idx
            total = peak + get_sum(peak - 1, left_len) + get_sum(peak - 1, right_len)
            return total <= max_sum
        
        low, high = 1, max_sum
        ans = 1
        while low <= high:
            mid = (low + high) // 2
            if is_valid(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxValue(4, 2, 6) == 2 # [1, 1, 2, 1] sum=5 <= 6, target_idx=2 peak=2
    assert sol.maxValue(6, 1, 10) == 3
    print("All tests passed for 3796.")

if __name__ == "__main__":
    run_tests()
