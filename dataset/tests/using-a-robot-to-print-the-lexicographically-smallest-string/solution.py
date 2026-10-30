class Solution:
    def robotWithString(self, s: str) -> str:
        n = len(s)
        min_suffix = ['z'] * (n + 1)
        for i in range(n - 1, -1, -1):
            min_suffix[i] = min(s[i], min_suffix[i + 1])
        
        t = []
        res = []
        for i, ch in enumerate(s):
            t.append(ch)
            while t and t[-1] <= min_suffix[i + 1]:
                res.append(t.pop())
        return "".join(res)
