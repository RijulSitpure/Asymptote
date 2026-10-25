class Solution:
    def interpret(self, command: str) -> str:
        return command.replace("()", "o").replace("(al)", "al")

def test():
    sol = Solution()
    assert sol.interpret("G()(al)") == "Goal"
    assert sol.interpret("G()()()()(al)") == "Gooooal"
    assert sol.interpret("(al)G(al)()()G") == "alGalooG"

    print("✓ goal-parser-interpretation passed")

if __name__ == '__main__':
    test()
