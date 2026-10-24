from typing import List

class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        n = len(matrix)
        low, high = matrix[0][0], matrix[n - 1][n - 1]

        def count_le(mid):
            count = 0
            r, c = n - 1, 0
            while r >= 0 and c < n:
                if matrix[r][c] <= mid:
                    count += r + 1
                    c += 1
                else:
                    r -= 1
            return count

        ans = low
        while low <= high:
            mid = (low + high) // 2
            if count_le(mid) >= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def test():
    sol = Solution()
    t1 = [[1,5,9],[10,11,13],[12,13,15]]
    assert sol.kthSmallest(t1, 8) == 13, "test 1 failed"
    t2 = [[-5]]
    assert sol.kthSmallest(t2, 1) == -5, "test 2 failed"
    print("✓ kth-smallest-element-in-a-sorted-matrix passed")

if __name__ == "__main__":
    test()
