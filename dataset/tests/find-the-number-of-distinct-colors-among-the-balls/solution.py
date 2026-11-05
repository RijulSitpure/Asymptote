class Solution:
    def queryResults(self, limit: int, queries: list[list[int]]) -> list[int]:
        ball_to_color = {}
        color_freq = {}
        ans = []
        for x, y in queries:
            if x in ball_to_color:
                old = ball_to_color[x]
                color_freq[old] -= 1
                if color_freq[old] == 0:
                    del color_freq[old]
            ball_to_color[x] = y
            color_freq[y] = color_freq.get(y, 0) + 1
            ans.append(len(color_freq))
        return ans