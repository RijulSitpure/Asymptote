class Solution:
    def entityParser(self, text: str) -> str:
        entities = {
            "&quot;": '"',
            "&apos;": "'",
            "&amp;": "&",
            "&gt;": ">",
            "&lt;": "<",
            "&frasl;": "/"
        }
        res = []
        i = 0
        n = len(text)
        while i < n:
            matched = False
            if text[i] == "&":
                for ent, char in entities.items():
                    if text.startswith(ent, i):
                        res.append(char)
                        i += len(ent)
                        matched = True
                        break
            if not matched:
                res.append(text[i])
                i += 1
        return "".join(res)

def test():
    sol = Solution()
    assert sol.entityParser("&amp; is an HTML entity but &ambassador; is not.") == "& is an HTML entity but &ambassador; is not.", "test 1 failed"
    assert sol.entityParser("and I quote: &quot;...&quot;") == "and I quote: \"...\"", "test 2 failed"
    print("✓ html-entity-parser passed")

if __name__ == "__main__":
    test()
