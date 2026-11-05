class Solution:
    def shortestSubstrings(self, arr: list[str]) -> list[str]:
        ans = []
        for i, word in enumerate(arr):
            subs = set()
            L = len(word)
            for length in range(1, L + 1):
                for start in range(L - length + 1):
                    subs.add(word[start:start + length])
            sorted_subs = sorted(subs, key=lambda s: (len(s), s))
            found = ""
            for sub in sorted_subs:
                if not any(sub in arr[j] for j in range(len(arr)) if j != i):
                    found = sub
                    break
            ans.append(found)
        return ans
