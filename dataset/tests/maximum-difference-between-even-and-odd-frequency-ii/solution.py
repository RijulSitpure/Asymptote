class Solution:
    def maxDifference(self, s: str, k: int) -> int:
        chars = sorted(list(set(s)))
        ans = -float("inf")
        for a in chars:
            for b in chars:
                if a == b:
                    continue
                min_diff = [[float("inf")] * 2 for _ in range(2)]
                prefix_a = [0]
                prefix_b = [0]
                l = 0
                for r in range(len(s)):
                    prefix_a.append(prefix_a[-1] + (1 if s[r] == a else 0))
                    prefix_b.append(prefix_b[-1] + (1 if s[r] == b else 0))
                    while (r - l + 1 >= k and 
                           prefix_a[l] < prefix_a[-1] and 
                           prefix_b[l] < prefix_b[-1]):
                        pa = prefix_a[l] % 2
                        pb = prefix_b[l] % 2
                        diff = prefix_a[l] - prefix_b[l]
                        if diff < min_diff[pa][pb]:
                            min_diff[pa][pb] = diff
                        l += 1
                    req_pa = 1 - (prefix_a[-1] % 2)
                    req_pb = prefix_b[-1] % 2
                    best_sub = min_diff[req_pa][req_pb]
                    if best_sub != float("inf"):
                        cand = (prefix_a[-1] - prefix_b[-1]) - best_sub
                        if cand > ans:
                            ans = cand
        return ans
