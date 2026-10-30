class Solution:
    def equalCountSubstrings(self, s: str, count: int) -> int:
        n = len(s)
        ans = 0

        for u in range(1, 27):
            length = u * count
            if length > n:
                break

            freq = [0] * 26
            valid_chars = 0

            for i in range(n):
                c_in = ord(s[i]) - 97
                freq[c_in] += 1
                if freq[c_in] == count:
                    valid_chars += 1
                elif freq[c_in] == count + 1:
                    valid_chars -= 1

                if i >= length:
                    c_out = ord(s[i - length]) - 97
                    if freq[c_out] == count:
                        valid_chars -= 1
                    elif freq[c_out] == count + 1:
                        valid_chars += 1
                    freq[c_out] -= 1

                if i >= length - 1 and valid_chars == u:
                    ans += 1

        return ans
