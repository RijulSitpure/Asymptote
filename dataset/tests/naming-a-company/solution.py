class Solution:
    def distinctNames(self, ideas: list[str]) -> int:
        groups = [set() for _ in range(26)]
        for w in ideas:
            groups[ord(w[0]) - ord('a')].add(w[1:])
        
        ans = 0
        for i in range(26):
            for j in range(i + 1, 26):
                common = len(groups[i] & groups[j])
                valid_i = len(groups[i]) - common
                valid_j = len(groups[j]) - common
                ans += 2 * valid_i * valid_j
        return ans
