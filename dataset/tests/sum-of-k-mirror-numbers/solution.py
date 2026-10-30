class Solution:
    def kMirror(self, k: int, n: int) -> int:
        def is_palindrome_k(val: int) -> bool:
            digits = []
            while val > 0:
                digits.append(val % k)
                val //= k
            return digits == digits[::-1]

        ans = 0
        count = 0
        length = 1

        while count < n:
            half_len = (length + 1) // 2
            start = 10 ** (half_len - 1)
            end = 10 ** half_len

            for prefix in range(start, end):
                s = str(prefix)
                if length % 2 == 1:
                    full = s + s[-2::-1]
                else:
                    full = s + s[::-1]

                val = int(full)
                if is_palindrome_k(val):
                    ans += val
                    count += 1
                    if count == n:
                        return ans

            length += 1

        return ans
