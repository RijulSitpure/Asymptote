class Solution:
    def createSortedArray(self, instructions: list[int]) -> int:
        MOD = 10**9 + 7
        MAX_VAL = max(instructions) + 1
        tree = [0] * (MAX_VAL + 1)

        def update(idx: int, val: int) -> None:
            while idx <= MAX_VAL:
                tree[idx] += val
                idx += idx & (-idx)

        def query(idx: int) -> int:
            s = 0
            while idx > 0:
                s += tree[idx]
                idx -= idx & (-idx)
            return s

        total_cost = 0
        for i, x in enumerate(instructions):
            less = query(x - 1)
            greater = i - query(x)
            total_cost = (total_cost + min(less, greater)) % MOD
            update(x, 1)
        return total_cost

def test():
    sol = Solution()
    assert sol.createSortedArray([1,5,6,2]) == 1
    assert sol.createSortedArray([1,2,3,6,5,4]) == 3
    assert sol.createSortedArray([1,3,3,3,2,4,2,1,2]) == 4

    print("✓ create-sorted-array-through-instructions passed")

if __name__ == '__main__':
    test()
