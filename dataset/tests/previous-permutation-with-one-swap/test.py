from typing import List

class Solution:
    def prevPermOpt1(self, arr: List[int]) -> List[int]:
        n = len(arr)
        i = n - 2
        while i >= 0 and arr[i] <= arr[i + 1]:
            i -= 1
        if i < 0:
            return arr

        max_val = -1
        best_j = -1
        for j in range(i + 1, n):
            if arr[j] < arr[i]:
                if arr[j] > max_val:
                    max_val = arr[j]
                    best_j = j

        arr[i], arr[best_j] = arr[best_j], arr[i]
        return arr

def test():
    sol = Solution()
    assert sol.prevPermOpt1([3,2,1]) == [3,1,2], "test 1 failed"
    assert sol.prevPermOpt1([1,1,5]) == [1,1,5], "test 2 failed"
    assert sol.prevPermOpt1([1,9,4,6,7]) == [1,7,4,6,9], "test 3 failed"
    print("✓ previous-permutation-with-one-swap passed")

if __name__ == "__main__":
    test()
