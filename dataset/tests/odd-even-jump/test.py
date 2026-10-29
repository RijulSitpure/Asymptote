import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'odd-even-jump.json')

class Solution:
    def oddEvenJumps(self, arr: list[int]) -> int:
        n = len(arr)
        def get_next(indices):
            res = [None] * n
            st = []
            for i in indices:
                while st and st[-1] < i:
                    res[st.pop()] = i
                st.append(i)
            return res

        sorted_idx = sorted(range(n), key=lambda i: (arr[i], i))
        odd_next = get_next(sorted_idx)
        sorted_idx_desc = sorted(range(n), key=lambda i: (-arr[i], i))
        even_next = get_next(sorted_idx_desc)

        odd = [False] * n
        even = [False] * n
        odd[-1] = True
        even[-1] = True

        for i in range(n - 2, -1, -1):
            if odd_next[i] is not None:
                odd[i] = even[odd_next[i]]
            if even_next[i] is not None:
                even[i] = odd[even_next[i]]

        return sum(odd)

sol = Solution()
assert sol.oddEvenJumps([10, 13, 12, 14, 15]) == 2
assert sol.oddEvenJumps([2, 3, 1, 1, 4]) == 3
assert sol.oddEvenJumps([5, 1, 3, 4, 2]) == 3
print("✓ odd-even-jump passed")
