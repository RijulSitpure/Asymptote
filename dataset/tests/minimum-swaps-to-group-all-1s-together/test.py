class Solution:
    def minSwaps(self, data: list[int]) -> int:
        w = sum(data)
        if w <= 1:
            return 0
        
        curr_ones = sum(data[:w])
        max_ones = curr_ones
        for i in range(w, len(data)):
            curr_ones += data[i] - data[i - w]
            if curr_ones > max_ones:
                max_ones = curr_ones
        return w - max_ones

def test():
    sol = Solution()
    assert sol.minSwaps([1,0,1,0,1]) == 1, "test 1 failed"
    assert sol.minSwaps([0,0,0,1,0]) == 0, "test 2 failed"
    assert sol.minSwaps([1,0,1,0,1,0,0,1,1,0,1]) == 3, "test 3 failed"
    print("✓ minimum-swaps-to-group-all-1s-together passed")

if __name__ == "__main__":
    test()
