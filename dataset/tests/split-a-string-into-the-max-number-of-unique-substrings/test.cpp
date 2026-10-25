#include <cassert>
#include <string>
#include "solution.cpp"

int main() {
    Solution sol;
    assert(sol.maxUniqueSplit("ababccc") == 5);
    assert(sol.maxUniqueSplit("aba") == 2);
    assert(sol.maxUniqueSplit("aa") == 1);
    return 0;
}