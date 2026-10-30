class Solution:
    def minimumOperations(self, nums: list[int]) -> int:
        n = len(nums)
        def get_min_swaps(target_zero_idx):
            if target_zero_idx == 0:
                target = list(range(n))
            else:
                target = [(i + 1) % n for i in range(n)]
            pos = {val: i for i, val in enumerate(nums)}
            visited = [False] * n
            total_moves = 0
            for i in range(n):
                if visited[i] or nums[i] == target[i]:
                    continue
                cycle_length = 0
                curr = i
                has_zero = False
                while not visited[curr]:
                    visited[curr] = True
                    if nums[curr] == 0:
                        has_zero = True
                    curr = pos[target[curr]]
                    cycle_length += 1
                if cycle_length > 1:
                    if has_zero:
                        total_moves += (cycle_length - 1)
                    else:
                        total_moves += (cycle_length + 1)
            return total_moves
        return min(get_min_swaps(0), get_min_swaps(n - 1))
