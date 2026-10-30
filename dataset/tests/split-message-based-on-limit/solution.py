class Solution:
    def splitMessage(self, message: str, limit: int) -> list[str]:
        n = len(message)
        cur_sum_len = 0
        for b in range(1, n + 1):
            d = len(str(b))
            cur_sum_len += len(str(b))
            if limit <= d + 3 + d:
                continue
            cap = b * (limit - 3 - d) - cur_sum_len
            if cap >= n:
                ans = []
                idx = 0
                for i in range(1, b + 1):
                    suffix = f"<{i}/{b}>"
                    msg_len = limit - len(suffix)
                    ans.append(message[idx:idx + msg_len] + suffix)
                    idx += msg_len
                return ans
        return []
