class Solution:
    def numOfUnplacedFruits(self, fruits: list[int], baskets: list[int]) -> int:
        n = len(baskets)
        tree = [0] * (4 * n)

        def build(node, start, end):
            if start == end:
                tree[node] = baskets[start]
                return
            mid = (start + end) // 2
            build(2 * node + 1, start, mid)
            build(2 * node + 2, mid + 1, end)
            tree[node] = max(tree[2 * node + 1], tree[2 * node + 2])

        def query_and_update(node, start, end, target):
            if tree[node] < target:
                return -1
            if start == end:
                tree[node] = -1
                return start
            mid = (start + end) // 2
            if tree[2 * node + 1] >= target:
                res = query_and_update(2 * node + 1, start, mid, target)
            else:
                res = query_and_update(2 * node + 2, mid + 1, end, target)
            tree[node] = max(tree[2 * node + 1], tree[2 * node + 2])
            return res

        build(0, 0, n - 1)
        unplaced = 0
        for fruit in fruits:
            idx = query_and_update(0, 0, n - 1, fruit)
            if idx == -1:
                unplaced += 1
        return unplaced

def test_fruits_into_baskets_iii():
    sol = Solution()
    assert sol.numOfUnplacedFruits([4, 2, 5], [3, 5, 4]) == 1
    assert sol.numOfUnplacedFruits([3, 6, 1], [6, 4, 7]) == 0

if __name__ == '__main__':
    test_fruits_into_baskets_iii()
    print('All tests passed.')
