from typing import List

class Solution:
    def kthSmallestPrimeFraction(self, arr: List[int], k: int) -> List[int]:
        n = len(arr)
        left, right = 0.0, 1.0

        while True:
            mid = (left + right) / 2.0
            count = 0
            best_p, best_q = 0, 1
            i = 0
            for j in range(1, n):
                while i < j and arr[i] <= mid * arr[j]:
                    i += 1
                count += i
                if i > 0 and arr[i - 1] * best_q > best_p * arr[j]:
                    best_p, best_q = arr[i - 1], arr[j]
            if count == k:
                return [best_p, best_q]
            elif count < k:
                left = mid
            else:
                right = mid

def test():
    sol = Solution()
    assert sol.kthSmallestPrimeFraction([1, 2, 3, 5], 3) == [2, 5], "test 1 failed"
    assert sol.kthSmallestPrimeFraction([1, 7], 1) == [1, 7], "test 2 failed"
    print("✓ k-th-smallest-prime-fraction passed")

if __name__ == "__main__":
    test()
