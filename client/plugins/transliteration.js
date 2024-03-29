export default function transliterate(data) {
    const keys = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'y',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
        ' ': '-', 'ъ': '', 'ь': '', '№': '', '!': "", '$': '',
        '%': '', '&': '', '\\': '', '(': '', ')': '', '*': '',
        '+': '', ',': '', '-': '-', '.': '-', '/': '-', ':': '',
        ';': '', '<': '', '>': '', '=': '', '?': '', '@': '', 
        '[': '', ']': '', '{': '', '}': '', '^': '', '_': '',
        '`': '', '~': '', '\'': '', '\"': "", 'й': 'i',  ',': '-'
    }

    if(data) return data.toString().toLowerCase().trim().split("").
            map(char =>(keys[char] || keys[char] === "") ? keys[char] : char).join("")
}