from typing import List

class Solution:
    def popcountQueries(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        depth = {1: 0}
        def get_depth(x: int) -> int:
            if x in depth:
                return depth[x]
            cnt = bin(x).count('1')
            depth[x] = 1 + get_depth(cnt)
            return depth[x]

        arr = [get_depth(x) for x in nums]
        ans = []
        for q in queries:
            t = q[0]
            if t == 1:
                # Range query [1, l, r, k]: count elements in arr[l..r] with depth k
                l, r, k = q[1], q[2], q[3]
                ans.append(sum(1 for i in range(l, r + 1) if arr[i] == k))
            elif t == 2:
                # Point update [2, idx, val]
                idx, val = q[1], q[2]
                arr[idx] = get_depth(val)
        return ans

def run_tests():
    s = Solution()
    res1 = s.popcountQueries([1, 2, 4, 3], [[1, 0, 3, 1], [2, 0, 2], [1, 0, 3, 1]])
    # popcount depths of [1, 2, 4, 3]: [0, 1, 1, 2]
    # query 1: depth 1 in 0..3 -> 2
    # update: idx 0 becomes 2 -> depth 1 -> depths [1, 1, 1, 2]
    # query 3: depth 1 in 0..3 -> 3
    assert res1 == [2, 3], f"Expected [2, 3], got {res1}"
    print("3624 number-of-integers-with-popcount-depth-equal-to-k-ii PASSED")

if __name__ == "__main__":
    run_tests()
