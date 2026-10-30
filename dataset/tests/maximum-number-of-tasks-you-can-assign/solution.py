from collections import deque

class Solution:
    def maxTaskAssign(self, tasks: list[int], workers: list[int], pills: int, strength: int) -> int:
        tasks.sort()
        workers.sort()

        def can_assign(k: int) -> bool:
            if k == 0:
                return True
            curr_tasks = tasks[:k]
            curr_workers = workers[-k:]
            p = pills
            q = deque()
            w_idx = k - 1

            for task in reversed(curr_tasks):
                while w_idx >= 0 and curr_workers[w_idx] + strength >= task:
                    q.appendleft(curr_workers[w_idx])
                    w_idx -= 1

                if not q:
                    return False

                if q[-1] >= task:
                    q.pop()
                else:
                    if p == 0:
                        return False
                    p -= 1
                    q.popleft()

            return True

        low = 0
        high = min(len(tasks), len(workers))
        ans = 0

        while low <= high:
            mid = (low + high) // 2
            if can_assign(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans
