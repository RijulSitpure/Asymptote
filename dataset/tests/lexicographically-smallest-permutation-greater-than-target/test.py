class Solution:
    def nextGreaterPermutation(self, nums: list[int]) -> list[int]:
        # Next permutation of nums
        a = list(nums)
        n = len(a)
        i = n - 2
        while i >= 0 and a[i] >= a[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while a[j] <= a[i]:
                j -= 1
            a[i], a[j] = a[j], a[i]
        # Reverse suffix
        a[i + 1:] = reversed(a[i + 1:])
        return a

def run_tests():
    sol = Solution()
    assert sol.nextGreaterPermutation([1, 2, 3]) == [1, 3, 2]
    assert sol.nextGreaterPermutation([3, 2, 1]) == [1, 2, 3]
    assert sol.nextGreaterPermutation([1, 1, 5]) == [1, 5, 1]
    print("All tests passed for 3720.")

if __name__ == "__main__":
    run_tests()