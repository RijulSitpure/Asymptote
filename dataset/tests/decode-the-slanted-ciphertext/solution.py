class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        if not encodedText or rows == 1:
            return encodedText

        n = len(encodedText)
        cols = n // rows
        res = []

        for start_c in range(cols):
            r = 0
            c = start_c
            while r < rows and c < cols:
                res.append(encodedText[r * cols + c])
                r += 1
                c += 1

        return "".join(res).rstrip()
