from typing import List

class Solution:
    def pathSum(self, nums: List[int]) -> int:
        tree = {}
        for num in nums:
            d = num // 100
            p = (num // 10) % 10
            v = num % 10
            tree[(d, p)] = v

        total_sum = 0

        def dfs(d: int, p: int, current_sum: int) -> None:
            nonlocal total_sum
            if (d, p) not in tree:
                return
            current_sum += tree[(d, p)]
            left_child = (d + 1, 2 * p - 1)
            right_child = (d + 1, 2 * p)

            if left_child not in tree and right_child not in tree:
                total_sum += current_sum
                return

            if left_child in tree:
                dfs(left_child[0], left_child[1], current_sum)
            if right_child in tree:
                dfs(right_child[0], right_child[1], current_sum)

        dfs(1, 1, 0)
        return total_sum

def test():
    sol = Solution()
    assert sol.pathSum([113, 215, 221]) == 12, "test 1 failed"
    assert sol.pathSum([113, 221]) == 4, "test 2 failed"
    print("✓ path-sum-iv passed")

if __name__ == "__main__":
    test()
