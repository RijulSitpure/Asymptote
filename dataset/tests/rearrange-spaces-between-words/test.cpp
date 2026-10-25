#include <cassert>
#include <string>
#include "solution.cpp"

int main() {
    Solution sol;
    assert(sol.reorderSpaces("  this   is  a sentence ") == "this   is   a   sentence");
    assert(sol.reorderSpaces(" practice   makes   perfect") == "practice   makes   perfect ");
    assert(sol.reorderSpaces("hello   world") == "hello   world");
    assert(sol.reorderSpaces("a") == "a");
    return 0;
}