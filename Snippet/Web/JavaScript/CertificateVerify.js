
$(function(){
    /**
     * 证件号校验规则
     */
    function verifyIdentifyNumber(relatedType, identificationType, identifyNo) {
        console.log('relatedType: ' + relatedType + ' identificationType: ' + identificationType + ' identifyNo: ' + identifyNo);
        if (relatedType === '1') { // 当关系人类型为 个人 时
            switch (identificationType) { // 证件类型
                case '1': // 身份证
                    console.log('身份证');
                    if (!IDCardVerify(identifyNo)) {
                        alert('请输入有效的身份证号！');
                        return false;
                    }
                    return true;
                case '2': // 护照
                    console.log('护照');
                    if (!passportVerif(identifyNo)) {
                        alert('请输入有效的护照！');
                        return false;
                    }
                    return true;
                case '3': // 军人证
                    console.log('军人证');
                    if (!militaryIDVerify(identifyNo)) {
                        alert('请输入有效的军人证！');
                        return false;
                    }
                    return true;
                case '4': // 驾驶证  驾驶证 证号与 身份证号一致
                    console.log('驾驶证');
                    if (!IDCardVerify(identifyNo)) {
                        alert('请输入有效的驾驶证号！');
                        return false;
                    }
                    return true;
                case '5': // 港澳台同胞证
                    console.log('港澳台同胞证');
                    if (!hongKongMacauAndTaiwanCompatriotCardVerify(identifyNo)) {
                        alert('请输入有效的港澳台同胞证！');
                        return false;
                    }
                    return true;
                case '7': // 中国护照
                    console.log('中国护照');
                    if (!chinesePassportVerify(identifyNo)) {
                        alert('请输入有效的中国护照！');
                        return false;
                    }
                    return true;
                case '99': // 其他
                    console.log('其他');
                    if (!otherNoVerify(identifyNo)) {
                        alert('请输入有效的证件号！');
                        return false;
                    }
                    return true;
            }
        } else if (relatedType === '2') { // 当关系人类型为 团体 时
            switch (identificationType) { // 证件类型
                case '1': // 组织机构代码证
                    console.log('组织机构代码证');
                    if (!organizationCodeCertificateVerif(identifyNo)) {
                        alert('请输入有效的组织机构代码证！');
                        return false;
                    }
                    return true;
                case '2': // 税务登记证
                    console.log('税务登记证');
                    if (!taxRegistrationCertificateVerify(identifyNo)) {
                        alert('请输入有效的税务登记证！');
                        return false;
                    }
                    return true;
                case '21': // 统一社会信用代码
                    console.log('统一社会信用代码');
                    if (!unifiedSocialCreditCodeVerify(identifyNo)) {
                        alert('请输入有效的统一社会信用代码！');
                        return false;
                    }
                    return true;
                case '99': // 其他
                    console.log('其他');
                    if (!otherNoVerify(identifyNo)) {
                        alert('请输入有效的证件号！');
                        return false;
                    }
                    return true;
            }
        }
    }
    var aCity = {11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"};
    
    /**
     * 身份证号  驾驶证
     */
    function IDCardVerify(num) {
        if (!num) {
            return false;
        }
        num = num.toUpperCase().trim();
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        len = num.length;
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
            }
        } else if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);
            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
                var nTemp = 0, i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    return false;
                }
            }
        }
        // 地区码
        if (aCity[parseInt(num.substr(0, 2))] == null) {
            return false;
        }
        if (Number(num.substr(6, 2)) < 19) {
            return false;
        }
        return true;
    }
    let firstarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let firstkeys = [3, 7, 9, 10, 5, 8, 4, 2];
    let secondarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'];
    let secondkeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

    /**
     * 统一社会信用代码
     */
    function unifiedSocialCreditCodeVerify(str) {
        var code = str.toUpperCase().trim();
        /*
        统一社会信用代码由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成。
        第1位：登记管理部门代码（共一位字符）
        第2位：机构类别代码（共一位字符）
        第3位~第8位：登记管理机关行政区划码（共六位阿拉伯数字）
        第9位~第17位：主体标识码（组织机构代码）（共九位字符）
        第18位：校验码​（共一位字符）
        */
        if (code.length != 18) {
            return false;
        }

        var reg = /^\w\w\d{6}\w{9}\w$/;
        if (!reg.test(code)) {
            return false;
        }

        /*
        登记管理部门代码：使用阿拉伯数字或大写英文字母表示。​
        机构编制：1​
        民政：5​
        工商：9​
        其余：Y
        */
        reg = /^[1,5,9,Y]\w\d{6}\w{9}\w$/;
        if (!reg.test(code)) {
            return false;
        }

        /*
        机构类别代码：使用阿拉伯数字或大写英文字母表示。​
        机构编制机关：11打头​​
        机构编制事业单位：12打头​
        机构编制中央编办直接管理机构编制的群众团体：13打头​​
        机构编制其余：19打头​
        民政社会团体：51打头​
        民政民办非企业单位：52打头​
        民政基金会：53打头​
        民政其余：59打头​
        工商企业：91打头​
        工商个体工商户：92打头​
        工商农民专业合做社：93打头​
        其余：Y1打头​
        */
        reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
        if (!reg.test(code)) {
            return false;
        }

        /*
        登记管理机关行政区划码：只能使用阿拉伯数字表示。按照GB/T 2260编码。​
        例如：四川省成都市本级就是510100；四川省自贡市自流井区就是510302。​
        */
        reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
        if (!reg.test(code)) {
            return false;
        }
        /*
        主体标识码（组织机构代码）：使用阿拉伯数字或英文大写字母表示。按照GB 11714编码。
        在实行统一社会信用代码以前，之前的组织机构代码证上的组织机构代码由九位字符组成。格式为XXXXXXXX-Y。前面八位被称为“本体代码”；最后一位被称为“校验码”。校验码和本体代码由一个连字号（-）链接起来。以便让人很容易的看出校验码。可是三证合一后，组织机构的九位字符所有被归入统一社会信用代码的第9位至第17位，其原有组织机构代码上的连字号不带入统一社会信用代码。
        原有组织机构代码上的“校验码”的计算规则是：​
        例如：某公司的组织机构代码是：59467239-9。那其最后一位的组织机构代码校验码9是如何计算出来的呢？
        第一步：取组织机构代码的前八位本体代码为基数。5 9 4 6 7 2 3 9
        提示：若是本体代码中含有英文大写字母。则A的基数是10，B的基数是11，C的基数是12，依此类推，直到Z的基数是35。
        第二步：​​取加权因子数值。由于组织机构代码的本体代码一共是八位字符。则这八位的加权因子数值从左到右分别是：三、七、九、十、五、八、四、2。​
        第三步：本体代码基数与对应位数的因子数值相乘。​
        5×3＝15，9×7＝63，4×9＝36，6×10＝60，
        7×5＝35，2×8＝16，3×4=12，9×2＝18​​
        第四步：将乘积求和相加。​
        15+63+36+60+35+16+12+18=255
        第五步：​将和数除以11，求余数。​​
        255÷11=33，余数是2。​​
        */
        var firstkey = calc(code.substr(8), firstarray, firstkeys, 11);
        /*
        第六步：用阿拉伯数字11减去余数，得求校验码的数值。当校验码的数值为10时，校验码用英文大写字母X来表示；当校验码的数值为11时，校验码用0来表示；其他求出的校验码数值就用其自己的阿拉伯数字来表示。​
        11-2＝9，所以此公司完整的组织机构代码为 59467239-9。​​
        */
        var firstword;
        if (firstkey < 10) {
            firstword = firstkey;
        }
        if (firstkey == 10) {
            firstword = 'X';
        } else if (firstkey == 11) {
            firstword = '0';
        }
        if (firstword != code.substr(16, 1)) {
            return false;
        }
        /*
        校验码：使用阿拉伯数字或大写英文字母来表示。校验码的计算方法参照 GB/T 17710。
        例如：某公司的统一社会信用代码为91512081MA62K0260E，那其最后一位的校验码E是如何计算出来的呢？
        第一步：取统一社会信用代码的前十七位为基数。9 1 5 1 2 0 8 1 21 10 6 2 19 0 2 6 0提示：若是前十七位统一社会信用代码含有英文大写字母（不使用I、O、Z、S、V这五个英文字母）。则英文字母对应的基数分别为：A=十、B=十一、C=十二、D=1三、E=1四、F=1五、G=1六、H=1七、J=1八、K=1九、L=20、M=2一、N=2二、P=2三、Q=2四、R=2五、T=2六、U=2七、W=2八、X=2九、Y=30​
        第二步：​​取加权因子数值。由于统一社会信用代码前面前面有十七位字符。则这十七位的加权因子数值从左到右分别是：一、三、九、2七、1九、2六、1六、1七、20、2九、2五、1三、八、2四、十、30、2​8
        第三步：基数与对应位数的因子数值相乘。​
        9×1=9，1×3=3，5×9=45，1×27=27，2×19=38，0×26=0，8×16=128​
        1×17=17，21×20=420，10×29=290，6×25=150，2×13=26，19×8=152​
        0×23=0，2×10=20，6×30=180，0×28=0
        第四步：将乘积求和相加。​9+3+45+27+38+0+128+17+420+290+150+26+152+0+20+180+0=1495
        第五步：​将和数除以31，求余数。​​
        1495÷31=48，余数是17。​​
        */
        var secondkey = calc(code, secondarray, secondkeys, 31);
        /*
        第六步：用阿拉伯数字31减去余数，得求校验码的数值。当校验码的数值为0~9时，就直接用该校验码的数值做为最终的统一社会信用代码的校验码；若是校验码的数值是10~30，则校验码转换为对应的大写英文字母。对应关系为：A=十、B=十一、C=十二、D=1三、E=1四、F=1五、G=1六、H=1七、J=1八、K=1九、L=20、M=2一、N=2二、P=2三、Q=2四、R=2五、T=2六、U=2七、W=2八、X=2九、Y=30
        由于，31-17＝14，因此该公司完整的统一社会信用代码为 91512081MA62K0260E。​​
        */
        var secondword = secondarray[secondkey];
        if (!secondword || secondword != code.substr(17, 1)) {
            return false;
        }
        var word = code.substr(0, 16) + firstword + secondword;
        if (code != word) {
            return false;
        }
        return true;
    }

    /**
     * 组织机构代码证
     */
    function organizationCodeCertificateVerif(num) {
        var code = num.toUpperCase().trim();
        var regExp = /^[0-9a-zA-Z]{8}(-?)[0-9a-zA-Z]$/;
        if (!regExp.test(num)) {
            return false;
        }
        var firstkey = calc(num, firstarray, firstkeys, 11);
        var firstword;
        if (firstkey < 10) {
            firstword = firstkey;
        }
        if (firstkey === 10) {
            firstword = 'X';
        } else if (firstkey === 11) {
            firstword = '0';
        }
        if (firstword != code.substr(code.length - 1, 1)) {
            return false;
        }
        return true;
    }

    /**
     * 税务登记证
     *  TODO 此验证是根据百度百科提供的编码规则（如下） 编写，可能有所误差，后期可对应修改
     *
     * 税务登记号编码规则是:纳税人识别号是指税务登记号（分组织机构代码和身份证注册）：
     *  1、税务登记证号由六位行政区划代码加九位组织机构代码组成。
     *  组织机构代码是质量技术监督局发放的组织机构代码证上的九位数字与大写拉丁字母，这个组合是唯一的。
     *  2、个体经营者办理税务登记证的由：旧的身份证15位码加5个0或新的身份证18位码加2个0；
     *  如果同一身份证办多户税务登记的，则第二户的税务登记证后两位改为“01”，第三户改为“02”。
     */
    function taxRegistrationCertificateVerify(num) {
        num = num.toUpperCase().trim();
        console.log('税务登记证: ', num)
        var len = num.length;
        var regExp = /^\w{15}$|^\w{17,18}$|^\w{20}$/;
        if (!regExp.test(num)) {
            return false;
        }
        // 使用统一社会信用代码
        if (unifiedSocialCreditCodeVerify(num)) {
            return true;
        }
        if (!(/^[1-9][0-7]\d{4}$/.test(num.substr(0, 6)))) {
            return false;
        }
        // 组织机构代码注册
        if (aCity[parseInt(num.substr(0, 2))] == null) {
            return false;
        }
        if (organizationCodeCertificateVerif(num.substr(6))) {
            return true;
        }
        // 身份证注册
        var IDCardNo = num.substr(0, num.length - 2);
        if (IDCardVerify(IDCardNo)) {
            return true;
        }
        return false;
    }

    /**
     * 港澳台同胞证
     *
     * 验证 港澳居民通行证 == 通行证号码组成规则：
     *  通行证证件号码共11位。
     *  第1位为字母，“H”字头签发给香港居民，“M”字头签发给澳门居民；
     *  第2位至第11位为数字，
     *  前8位数字为通行证持有人的终身号，后2位数字表示换证次数，
     *  首次发证为00，首次换证，第10位至第11位数字变为01；再次换证，由01变为02, 此后依次递增。
     *
     * 验证 台湾居民来往大陆通行证（台胞证） == 通行证号码组成规则：
     *  前8为数字为通行证持有人的终身号，后2位数字表示换证次数
     *
     * TODO 港澳台同胞证 定义有所模糊不清，暂按 港澳居民通行证 + 台湾居民来往大陆通行证（台胞证） 进行校验
     *  依据： 国务院港澳事务办公室 https://www.hmo.gov.cn/fwga_new/wldjnd/201711/t20171120_1333.html 编写，可能有所误差，后期可对应修改
     *  台湾居民来往大陆通行证 依据 https://link.zhihu.com/?target=https%3A//zh.m.wikipedia.org/wiki/%25E6%25B8%25AF%25E6%25BE%25B3%25E5%258F%25B0%25E5%25B1%2585%25E6%25B0%2591%25E5%25B1%2585%25E4%25BD%258F%25E8%25AF%2581
     *
     */
    function hongKongMacauAndTaiwanCompatriotCardVerify(num) {
        num = num.toUpperCase().trim();
        console.log('港澳台同胞证: ', num)
        // 验证 港澳居民通行证
        var regHM = /^[HMhm]{1}([0-9]{8}|[0-9]{10})$/;
        if (regHM.test(num)) {
            return true;
        }
        // 台湾居民来往大陆通行证（台胞证）
        var regTW = /^\d{8}$|^\d{10}$/;
        if (regTW.test(num)) {
            return true;
        }
        return false;
    }

    /**
     * 中国护照
     * 护照有四种类型：普通护照、公务护照、澳门特别行政区护照和香港特别行政区护照四种类型，不同的护照类型护照号码格式也是不一样的。
     * 护照号以 G、P、S、D开头的位中国护照，
     *  因私普通护照：    14/15+7位数，G+8位数;
     *  因公普通护照：    P+7位数;
     *  公务护照：       S+7位数或者 S+8位数;
     *  外交护照：       以D开头，D=diplomatic。
     *  普通电子护照     E +
     *
     *  TODO 此正则验证是根据上面对护照号的描述编写，可能有所误差，可修正
     *
     */
    function chinesePassportVerify(num) {
        num = num.toUpperCase().trim();
        console.log('中国护照: ', num);
        /*
            这一版为自己编写 /^(14|15)([a-zA-Z]|[0-9])\d{6}$|^[PG]([a-zA-Z]|[0-9])\d{6}$|^[SDE]([a-zA-Z]|[0-9])\d{6,7}$/
            下面使用版为网络查找的
            网络查找版本还有如下：
                ^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$
                ^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$
         */
        var regChinesePassport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
        if (!regChinesePassport.test(num)) {
            return false;
        }
        return true;
    }

    /**
     * 护照
     * 照ICAO(International Civil Aviation Organization 国际民航组织)要求，
     * 全世界护照的号码均为9位拉丁字母或阿拉伯数字
     *
     * TODO 此正则验证可能有所误差，可修正
     */
    function passportVerif(num) {
        num = num.toUpperCase().trim();
        console.log('护照: ', num);
        var regPassport = /^([a-zA-z]|[0-9]){7,9}$/;
        if (!regPassport.test(num)) {
            return false;
        }
        return true;
    }

    /**
     * 军人证
     *  TODO 军人证定义模糊
     *  军人证是一个统称，军人包括干部、学员和战士。
     *  战士分为士兵和士官，干部包括现役军官和文职干部。
     *  所以，军人证有军官证（发给现役军官），文职干部证（发给文职干部），学员证（发给学员，主要是生长干部学员），士官证（发给士官）和士兵证（发给士兵）。
     *  其中军官证、文职干部证、士官证和士兵证的外观都是全军统一的，只是发证机关不同。
     *  而学员证则五花八门，都是由各院校自行制作发放的。
     *  军人证是所以军人的统称包括很多的名称头衔的
     *
     *  2016式《中国人民解放军军官证》证件号编制规则：
     *      统一采取“军”冠字头加7位数字的形式编码 如：军字第P011816X号
     *
     * 基本格式: 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
     */
    function militaryIDVerify(num) {
        num = num.toUpperCase().trim();
        console.log('军人证: ', num);
        //  规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
        var regMilitary = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
        if (!regMilitary.test(num)) {
            return false;
        }
        return true;
    }

    /**
     * 其他
     * 验证规则：
     *  长度不大于50的字符串
     */
    function otherNoVerify(num) {
        num = num.toUpperCase().trim();
        console.log('num length: ', num.length)
        if (num.length > 50) {
            return false;
        }
        return true;
    }

    function calc(code, arrays, keys, b) {
        var count = 0;
        for (var i = 0; i < keys.length; i++) {
            var a = code[i];
            count += keys[i] * arrays.indexOf(a);
        }
        var remainder = count % b;
        return remainder === 0 ? 0 : b - remainder;
    }
});
