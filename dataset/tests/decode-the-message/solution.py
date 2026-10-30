class Solution:
    def decodeMessage(self, key: str, message: str) -> str:
        mapping = {' ': ' '}
        cur = ord('a')
        for ch in key:
            if ch not in mapping:
                mapping[ch] = chr(cur)
                cur += 1
        return "".join(mapping[ch] for ch in message)
