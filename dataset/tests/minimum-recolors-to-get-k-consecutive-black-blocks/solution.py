class Solution:
    def minimumRecolors(self, blocks: str, k: int) -> int:
        cur_w = sum(1 for ch in blocks[:k] if ch == 'W')
        ans = cur_w
        for i in range(k, len(blocks)):
            if blocks[i] == 'W':
                cur_w += 1
            if blocks[i - k] == 'W':
                cur_w -= 1
            ans = min(ans, cur_w)
        return ans
