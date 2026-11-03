import heapq

class Solution:
    def earliestSecondToMarkIndices(self, nums: list[int], changeIndices: list[int]) -> int:
        n = len(nums)
        m = len(changeIndices)
        nums_sum = sum(nums)

        def can_mark(max_second: int) -> bool:
            second_to_index = {}
            seen = set()
            for s in range(max_second):
                idx = changeIndices[s] - 1
                if idx not in seen and nums[idx] > 0:
                    seen.add(idx)
                    second_to_index[s] = idx

            min_heap = []
            marks = 0
            for second in range(max_second - 1, -1, -1):
                if second in second_to_index:
                    index = second_to_index[second]
                    heapq.heappush(min_heap, nums[index])
                    if marks == 0:
                        heapq.heappop(min_heap)
                        marks += 1
                    else:
                        marks -= 1
                else:
                    marks += 1

            decrement_cost = (nums_sum - sum(min_heap)) + (n - len(min_heap))
            reset_cost = 2 * len(min_heap)
            return decrement_cost + reset_cost <= max_second

        l, r = 1, m
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if can_mark(mid):
                ans = mid
                r = mid - 1
            else:
                l = mid + 1
        return ans
