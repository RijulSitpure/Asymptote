from collections import defaultdict

class Solution:
    def getDistances(self, arr: list[int]) -> list[int]:
        n = len(arr)
        groups = defaultdict(list)
        for i, val in enumerate(arr):
            groups[val].append(i)

        ans = [0] * n

        for val, indices in groups.items():
            m = len(indices)
            pref = [0] * (m + 1)
            for i in range(m):
                pref[i + 1] = pref[i] + indices[i]

            total_sum = pref[m]
            for i in range(m):
                idx = indices[i]
                left_contrib = i * idx - pref[i]
                right_contrib = (total_sum - pref[i + 1]) - (m - 1 - i) * idx
                ans[idx] = left_contrib + right_contrib

        return ans
