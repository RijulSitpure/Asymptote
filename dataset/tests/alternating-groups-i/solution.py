class Solution:
    def numberOfAlternatingGroups(self, colors: list[int]) -> int:
        n = len(colors)
        ans = 0
        for i in range(n):
            if colors[i] != colors[(i - 1) % n] and colors[i] != colors[(i + 1) % n]:
                ans += 1
        return ans