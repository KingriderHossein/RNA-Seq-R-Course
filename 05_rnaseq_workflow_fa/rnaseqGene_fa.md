# جریان کاری <span dir="ltr">RNA-seq:</span> تحلیل اکتشافی در سطح ژن و <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی)

<span dir="ltr">Michael</span> <span dir="ltr">I.</span> <span dir="ltr">Love</span> 1,2 ، <span dir="ltr">Simon</span> <span dir="ltr">Anders</span> 3 ، <span dir="ltr">Vladislav</span> <span dir="ltr">Kim</span> 4 و <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber</span> 4

1 گروه آمارزیستی، <span dir="ltr">UNC-Chapel</span> <span dir="ltr">Hill</span>، چپل‌هیل، کارولینای شمالی، آمریکا  
2 گروه ژنتیک، <span dir="ltr">UNC-Chapel</span> <span dir="ltr">Hill</span>، چپل‌هیل، کارولینای شمالی، آمریکا  
3 مرکز زیست‌شناسی مولکولی دانشگاه هایدلبرگ، هایدلبرگ، آلمان  
4 آزمایشگاه اروپایی زیست‌شناسی مولکولی (<span dir="ltr">EMBL</span>)، هایدلبرگ، آلمان

#### ۱۶ اکتبر ۲۰۱۹

#### چکیده

در اینجا گام‌به‌گام یک جریان کاری انتهابه‌انتها برای <span dir="ltr">RNA-seq</span> در سطح ژن برای انجام <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) در سطح ژن با استفاده از بسته‌های <span dir="ltr">Bioconductor</span> مرور می‌کنیم. از فایل‌های <span dir="ltr">FASTQ</span> آغاز می‌کنیم، نشان می‌دهیم چگونه این داده‌ها نسبت به <span dir="ltr">transcripts</span> (رونوشت‌ها)ی مرجع کمی‌سازی شده‌اند، و مجموعه‌داده‌های <span dir="ltr">count</span> (شمارش) در سطح ژن را برای تحلیل‌های پایین‌دستی آماده می‌کنیم. <span dir="ltr">exploratory</span> <span dir="ltr">data</span> <span dir="ltr">analysis</span> (تحلیل اکتشافی داده‌ها؛ <span dir="ltr">EDA</span>) را برای ارزیابی کیفیت و بررسی ارتباط بین نمونه‌ها انجام می‌دهیم، تحلیل بیان تفاضلی ژنی را پیش می‌بریم، و نتایج را به‌صورت بصری بررسی می‌کنیم.

# فهرست مطالب

* 1 مقدمه
  
    + 1\.1 داده‌های آزمایشی
* 2 آماده‌سازی ورودی کمی‌سازی برای _<span dir="ltr">DESeq2_</span>
  
    + 2\.1 کمی‌سازی رونوشت و _<span dir="ltr">tximport_</span> / _<span dir="ltr">tximeta_</span>
    + 2\.2 کمی‌سازی با _<span dir="ltr">Salmon_</span>
    + 2\.3 خواندن داده با _<span dir="ltr">tximeta_</span>
    + 2\.4 توابع واردسازی _<span dir="ltr">DESeq2_</span>
    + 2\.5 _<span dir="ltr">SummarizedExperiment_</span>
    + 2\.6 نقطهٔ انشعاب
* 3 شیء _<span dir="ltr">DESeqDataSet_</span>، اطلاعات نمونه و فرمول طراحی
  
    + 3\.1 شروع از _<span dir="ltr">SummarizedExperiment_</span>
    + 3\.2 شروع از ماتریس‌های شمارش
* 4 تحلیل اکتشافی و بصری‌سازی
  
    + 4\.1 پیش‌پالایش مجموعه‌داده
    + 4\.2 تبدیل پایاساز واریانس و <span dir="ltr">rlog</span>
    + 4\.3 فاصله‌های نمونه
    + 4\.4 نمودار <span dir="ltr">PCA</span>
    + 4\.5 نمودار <span dir="ltr">PCA</span> با استفاده از <span dir="ltr">PCA</span> تعمیم‌یافته
    + 4\.6 نمودار <span dir="ltr">MDS</span>
* 5 تحلیل بیان تفاضلی
  
    + 5\.1 اجرای خط لولهٔ تحلیل بیان تفاضلی
    + 5\.2 ساخت جدول نتایج
    + 5\.3 مقایسه‌های دیگر
    + 5\.4 <span dir="ltr">multiple</span> <span dir="ltr">testing</span> (آزمون‌های چندگانه)
* 6 ترسیم نتایج
  
    + 6\.1 نمودار شمارش‌ها
    + 6\.2 <span dir="ltr">MA-plot</span>
    + 6\.3 خوشه‌بندی ژن
    + 6\.4 پالایش مستقل
    + 6\.5 <span dir="ltr">Independent</span> <span dir="ltr">Hypothesis</span> <span dir="ltr">Weighting</span>
* 7 حاشیه‌نویسی و برون‌داد نتایج
  
    + 7\.1 برون‌داد نتایج
    + 7\.2 ترسیم تغییرِ نسبت‌ها در فضای ژنومی
* 8 حذف <span dir="ltr">batch</span> <span dir="ltr">effects</span> (اثرهای دسته‌ای) نهفته
  
    + 8\.1 استفاده از <span dir="ltr">SVA</span> با <span dir="ltr">DESeq2</span>
    + 8\.2 استفاده از <span dir="ltr">RUV</span> با <span dir="ltr">DESeq2</span>
* 9 آزمایش‌های گذر زمان
* 10 پیوست
  
    + 10\.1 جزئیات به‌روز دربارهٔ کمی‌سازی
        
        - 10\.1.1 دانلود فایل‌های <span dir="ltr">FASTQ</span>
        - 10\.1.2 ساخت ایندکس <span dir="ltr">salmon</span>
        - 10\.1.3 کمی‌سازی <span dir="ltr">abundance</span> (فراوانی) با <span dir="ltr">salmon</span>
        - 10\.1.4 تولید یک <span dir="ltr">RangedSummarizedExperiment</span> با <span dir="ltr">tximeta</span>
* 11 اطلاعات نشست
* منابع

**نسخهٔ <span dir="ltr">R</span>** : <span dir="ltr">R</span> <span dir="ltr">version</span> 4.6.0 <span dir="ltr">RC</span> (2026-04-17 <span dir="ltr">r89917</span>)

**نسخهٔ <span dir="ltr">Bioconductor</span>** : 3.23

**بسته** : 1.36.0

# 1 مقدمه

<span dir="ltr">Bioconductor</span> مجموعهٔ بزرگی از بسته‌ها را برای تحلیل داده‌های توالی‌یابی پربازده، از جمله <span dir="ltr">RNA-seq</span>، پشتیبانی می‌کند. بسته‌هایی که در این جریان کاری استفاده می‌کنیم شامل بسته‌های هسته‌ایِ نگه‌داری‌شده توسط تیم هستهٔ <span dir="ltr">Bioconductor</span> برای کار با حاشیه‌نویسی‌های ژنی هستند (مکان‌های <span dir="ltr">gene</span> (ژن) و <span dir="ltr">transcript</span> (رونوشت) در ژنوم، و نیز بازیابی شناسهٔ ژن). همچنین از بسته‌های مشارکتی برای تحلیل‌های آماری و بصری‌سازی داده‌های توالی‌یابی بهره می‌گیریم. با انتشارهای زمان‌بندی‌شدهٔ هر ۶ ماه، پروژهٔ <span dir="ltr">Bioconductor</span> اطمینان می‌دهد که همهٔ بسته‌های درون یک انتشار با هم سازگار و هماهنگ کار می‌کنند (و از این‌رو استعارهٔ «رسانه/رهبر ارکستر»). بسته‌های استفاده‌شده در این جریان کاری با تابع _<span dir="ltr">library_</span> بارگذاری می‌شوند و می‌توان آن‌ها را با دنبال کردن [راهنمای نصب بسته‌های <span dir="ltr">Bioconductor](http://bioconductor.org/install/)</span> نصب کرد.

* نسخهٔ منتشرشدهٔ این جریان کاری، شامل گزارش‌های داوران و دیدگاه‌ها، در [<span dir="ltr">F1000Research](http://f1000research.com/articles/4-1070)</span> در دسترس است. نسخه‌ای که اکنون می‌خوانید با آن متفاوت است، به‌ویژه از این جهت که اینجا کد اجرای سریع **<span dir="ltr">transcript</span> <span dir="ltr">quantification</span> (کمی‌سازی رونوشت)** و سپس واردسازی در <span dir="ltr">R/Bioconductor</span> برای انجام تحلیل در سطح ژن را ارائه می‌کنیم.
* جریان کاری <span dir="ltr">Bioconductor</span> دیگری که **<span dir="ltr">differential</span> <span dir="ltr">transcript</span> <span dir="ltr">usage</span> (<span dir="ltr">DTU</span>)** را پوشش می‌دهد، جریان کاری [<span dir="ltr">rnaseqDTU](https://bioconductor.org/packages/rnaseqDTU)</span> است؛ نسخهٔ منتشرشدهٔ آن نیز در [<span dir="ltr">F1000Research](https://f1000research.com/articles/7-952/v3)</span> در دسترس است.
* اگر دربارهٔ این جریان کاری یا هر نرم‌افزار <span dir="ltr">Bioconductor</span> پرسشی دارید، آن را در [<span dir="ltr">Bioconductor</span> <span dir="ltr">support</span> <span dir="ltr">site](https://support.bioconductor.org/)</span> مطرح کنید. اگر پرسش به بسته‌ای مشخص مربوط است، می‌توانید پست را با نام آن بسته برچسب بزنید، و برای پرسش‌های کلی‌تر دربارهٔ جریان کاری، پست را با __<span dir="ltr">KEEP_BIDI_00001__</span> برچسب بزنید. جهت طرح پرسشی بهینه در سایت پشتیبانی، [راهنمای ارسال__<span dir="ltr">KEEP_BIDI_00002__</span> را ببینید.

## ۱٫۱ داده‌های آزمایشی

داده‌های به‌کاررفته در این جریان کاری در بستهٔ _[<span dir="ltr">airway](https://bioconductor.org/packages/3.23/airway)_</span> ذخیره شده‌اند که خلاصه‌ای از یک آزمایش <span dir="ltr">RNA-seq</span> است؛ در آن، سلول‌های ماهیچهٔ صاف مجاری تنفسی با دگزامتازون، یک گلوکوکورتیکوئید صناعی با اثرات ضدالتهابی، تیمار شده‌اند (<span dir="ltr">Himes</span> و همکاران 2014). گلوکوکورتیکوئیدها، برای نمونه، توسط بیماران آسمی برای کاهش التهاب راه‌های هوایی استفاده می‌شوند. در این آزمایش، چهار رده‌سلولی اولیهٔ انسانی از ماهیچهٔ صاف مجاری با ۱ میکرومولار دگزامتازون به‌مدت ۱۸ ساعت تیمار شدند. برای هر یک از این چهار رده‌سلولی، یک نمونهٔ تیمارشده و یک نمونهٔ تیمارنشده داریم. برای توضیحات بیشتر دربارهٔ آزمایش به [مدخل <span dir="ltr">PubMed</span> 24926665__<span dir="ltr">KEEP_BIDI_00001__</span> و برای دادهٔ خام به [مدخل <span dir="ltr">GEO</span> <span dir="ltr">GSE52778](http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE52778)</span> مراجعه کنید.

# 2 آماده‌سازی ورودی کمی‌سازی برای <span dir="ltr">DESeq2</span>

برای ورودی، روش‌های آماریِ مبتنی بر <span dir="ltr">count</span> (شمارش)، مانند _[<span dir="ltr">DESeq2](https://bioconductor.org/packages/3.23/DESeq2)_</span> (<span dir="ltr">Love</span>، <span dir="ltr">Huber</span> و <span dir="ltr">Anders</span> 2014)، _[<span dir="ltr">edgeR](https://bioconductor.org/packages/3.23/edgeR)_</span> (<span dir="ltr">Robinson</span>، <span dir="ltr">McCarthy</span> و <span dir="ltr">Smyth</span> 2009)، _[<span dir="ltr">limma](https://bioconductor.org/packages/3.23/limma)_</span> با روش <span dir="ltr">voom</span> (<span dir="ltr">Law</span> و همکاران 2014)، _[<span dir="ltr">DSS](https://bioconductor.org/packages/3.23/DSS)_</span> (<span dir="ltr">Wu</span>، <span dir="ltr">Wang</span> و <span dir="ltr">Wu</span> 2013)، _[<span dir="ltr">EBSeq](https://bioconductor.org/packages/3.23/EBSeq)_</span> (<span dir="ltr">Leng</span> و همکاران 2013) و _[<span dir="ltr">baySeq](https://bioconductor.org/packages/3.23/baySeq)_</span> (<span dir="ltr">Hardcastle</span> و <span dir="ltr">Kelly</span> 2010)، انتظار دارند دادهٔ ورودی، مثلاً از <span dir="ltr">RNA-seq</span> یا هر آزمایش توالی‌یابی پربازده دیگر، به‌صورت ماتریسی از شمارش‌های نرمال‌سازی‌نشده باشد. مقدار خانهٔ واقع در ردیف _<span dir="ltr">i_</span> ام و ستون _<span dir="ltr">j_</span> ام ماتریس نشان می‌دهد چند <span dir="ltr">reads</span> (خوانش)‌ (یا قطعه، برای <span dir="ltr">RNA-seq</span> دوسر) می‌توان به <span dir="ltr">gene</span> (ژن) _<span dir="ltr">i_</span> در نمونهٔ _<span dir="ltr">j_</span> نسبت داد. به‌طور مشابه، برای انواع دیگر آزمون‌ها، ردیف‌های ماتریس ممکن است متناظر با نواحی اتصال (در <span dir="ltr">ChIP-Seq</span>)، یا توالی‌های پپتیدی (در طیف‌سنجی جرمی کمی) باشند.

مقادیر در ماتریس باید شمارش‌ها یا شمارش‌های برآوردشدهٔ خوانش‌ها/قطعه‌های توالی‌یابی باشند. این موضوع برای برقرار بودن مدل آماری _<span dir="ltr">DESeq2_</span> مهم است، زیرا تنها شمارش‌ها امکان برآوردِ ...
تا دقت اندازه‌گیری را به‌درستی بازتاب دهد. بسیار مهم است که _هرگز_ <span dir="ltr">count</span> (شمارش)‌هایی را که از پیش برای عمق توالی‌یابی/اندازهٔ کتابخانهٔ نمونه <span dir="ltr">normalization</span> (نرمال‌سازی) شده‌اند ارائه نکنید؛ زیرا مدل آماری زمانی بیشترین توان را دارد که بر شمارش‌های نانرمال‌شده اعمال شود و به‌طور درون‌مدل برای اختلاف اندازهٔ کتابخانه‌ها نیز طراحی شده است.

## ۲٫۱ کمی‌سازی رونوشت‌ها با _<span dir="ltr">tximport_</span> / _<span dir="ltr">tximeta_</span>

در نسخهٔ پیشین این جریان‌کار (از جمله نسخهٔ منتشرشده) نشان داده شد که چگونه می‌توان <span dir="ltr">read</span> (خوانش)‌ها را به ژنوم هم‌تراز کرد و سپس تعداد خوانش‌هایی را شمرد که با الگوهای <span dir="ltr">gene</span> (ژن) سازگارند. اکنون یک خط لولهٔ جایگزین و سریع‌تر به‌جای هم‌ترازی ژنومی و شمارش خوانش‌ها توصیه می‌شود. در این جریان‌کار نشان خواهیم داد چگونه داده‌های کمی‌سازی سطح <span dir="ltr">transcript</span> (رونوشت) را وارد کرده و با استفاده از _<span dir="ltr">tximport_</span> یا _<span dir="ltr">tximeta_</span> به سطح ژن تجمیع کنیم. روش‌های کمی‌سازی رونوشت مانند [<span dir="ltr">Salmon](https://combine-lab.github.io/salmon/)</span> (<span dir="ltr">Patro</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2017 ) ، [<span dir="ltr">kallisto](https://pachterlab.github.io/kallisto/)</span> (<span dir="ltr">Bray</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2016 ) یا [<span dir="ltr">RSEM](http://deweylab.github.io/RSEM/)</span> (<span dir="ltr">Li</span> <span dir="ltr">and</span> <span dir="ltr">Dewey</span> 2011 ) نگاشت یا هم‌ترازی خوانش‌ها به رونوشت‌های مرجع را انجام می‌دهند و در خروجی، شمارش‌های برآوردشده برای هر رونوشت و نیز طول‌های مؤثر رونوشت را می‌دهند که اثرات بایاس را خلاصه می‌کنند. پس از اجرای یکی از این ابزارها، بسته‌های _[<span dir="ltr">tximport](https://bioconductor.org/packages/3.23/tximport)_</span> (<span dir="ltr">Soneson</span>, <span dir="ltr">Love</span>, <span dir="ltr">and</span> <span dir="ltr">Robinson</span> 2015 ) یا _[<span dir="ltr">tximeta](https://bioconductor.org/packages/3.23/tximeta)_</span> (<span dir="ltr">Love</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2020 ) می‌توانند ماتریس‌های شمارش و <span dir="ltr">offset</span> (افست) برآوردشده را برای استفاده در بسته‌های <span dir="ltr">Bioconductor</span> مربوط به <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) ژن‌ها بسازند؛ همان‌گونه که در ادامه نشان داده خواهد شد.

آموزشی کوتاه دربارهٔ استفاده از نرم‌افزار _<span dir="ltr">Salmon_</span> برای کمی‌سازی <span dir="ltr">abundance</span> (فراوانی) رونوشت
[اینجا__<span dir="ltr">KEEP_BIDI_00000__</span> در دسترس است.
توصیه می‌کنیم از __<span dir="ltr">KEEP_BIDI_00000__</span> [<span dir="ltr">flag](http://salmon.readthedocs.io/en/latest/salmon.html)</span> استفاده کنید که یک ضریب تصحیح برای بایاس‌های نظام‌مند که به‌طور معمول در داده‌های <span dir="ltr">RNA-seq</span> وجود دارند برآورد می‌کند (<span dir="ltr">Love</span>, <span dir="ltr">Hogenesch</span>, <span dir="ltr">and</span> <span dir="ltr">Irizarry</span> 2016 ; <span dir="ltr">Patro</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2017 ) ، مگر آن‌که مطمئن باشید داده‌های شما چنین بایاس‌هایی ندارند.

مزیت‌های استفاده از ابزارهای کمی‌سازی فراوانی رونوشت در کنار _<span dir="ltr">tximport_</span> / _<span dir="ltr">tximeta_</span> برای تولید ماتریس‌های شمارش در سطح ژن و افست‌های نرمال‌سازی عبارت‌اند از: (1) این رویکرد هرگونه تغییر احتمالی در طول ژن‌ها در میان نمونه‌ها را تصحیح می‌کند (مثلاً ناشی از استفادهٔ تفاضلی ایزوفرم‌ها) (<span dir="ltr">Trapnell</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2013 ) ؛ (2) برخی از این روش‌ها به‌طور قابل‌توجهی سریع‌ترند و حافظه و دیسک کمتری نسبت به روش‌های مبتنی بر هم‌ترازی نیاز دارند؛ و (3) می‌توان از کنار گذاشتن آن دسته از قطعاتی که می‌توانند به چند ژن با توالی‌های همولوگ هم‌تراز شوند پرهیز کرد (<span dir="ltr">Robert</span> <span dir="ltr">and</span> <span dir="ltr">Watson</span> 5 201 ) . توجه داشته باشید که ابزارهای کمی‌سازی فراوانی رونوشت از تولید فایل‌های بزرگ حاوی هم‌ترازی خوانش‌ها صرف‌نظر می‌کنند و در عوض، فایل‌های کوچک‌تری تولید می‌کنند که فراوانی‌های برآوردشده، شمارش‌ها و طول‌های مؤثر به‌ازای هر رونوشت را ذخیره می‌کنند. برای جزئیات بیشتر، به دست‌نوشتهٔ تشریح‌کنندهٔ این رویکرد (<span dir="ltr">Soneson</span>, <span dir="ltr">Love</span>, <span dir="ltr">and</span> <span dir="ltr">Robinson</span> 2015 ) و وینگت بستهٔ _[<span dir="ltr">tximport](https://bioconductor.org/packages/3.23/tximport)_</span> برای جزئیات نرم‌افزاری مراجعه کنید.

_[<span dir="ltr">tximeta](https://bioconductor.org/packages/3.23/tximeta)_</span> (<span dir="ltr">Love</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2020 ) گسترشی بر _<span dir="ltr">tximport_</span> است که همان کارکردها را به‌همراه مزیت افزودهٔ افزودن خودکار فرادادهٔ شرح‌واره برای ترنسکریپتوم‌های پرتکرار (<span dir="ltr">GENCODE</span>، <span dir="ltr">Ensembl</span>، <span dir="ltr">RefSeq</span> برای انسان و موش) ارائه می‌دهد. برای جزئیات بیشتر، وینگت بستهٔ [<span dir="ltr">tximeta</span> <span dir="ltr">vignette](https://bioconductor.org/packages/release/bioc/vignettes/tximeta/inst/doc/tximeta.htmlm)</span> را ببینید. _<span dir="ltr">tximeta_</span> یک _<span dir="ltr">SummarizedExperiment_</span> تولید می‌کند که با استفاده از تابع __<span dir="ltr">KEEP_BIDI_00002__</span> به‌آسانی در _<span dir="ltr">DESeq2_</span> بارگذاری می‌شود؛ که در ادامه نشان داده خواهد شد. همچنین دربارهٔ ورودی‌های ممکن به _<span dir="ltr">DESeq2_</span> نیز گفتگو خواهیم کرد، چه با استفاده از _<span dir="ltr">tximport_</span> ، _<span dir="ltr">tximeta_</span> ، _<span dir="ltr">htseq_</span> (<span dir="ltr">Anders</span>, <span dir="ltr">Pyl</span>, <span dir="ltr">and</span> <span dir="ltr">Huber</span> 2015 ) ، یا یک ماتریس شمارش از پیش محاسبه‌شده.

## ۲٫۲ کمی‌سازی با _<span dir="ltr">Salmon_</span>

همان‌گونه که در بالا اشاره شد، آموزشی کوتاه دربارهٔ نحوهٔ استفاده از _<span dir="ltr">Salmon_</span> را می‌توان
[اینجا__<span dir="ltr">KEEP_BIDI_00000__</span>
یافت؛ بنابراین در عوض، کدی را ارائه می‌کنیم که برای کمی‌سازی فایل‌های به‌کاررفته در این جریان‌کار استفاده شد. _<span dir="ltr">Salmon_</span> را می‌توان به‌راحتی روی یک کلاستر با استفاده از
سیستم مدیریت جریان‌کار [<span dir="ltr">Snakemake](https://snakemake.readthedocs.io/en/stable/)</span> (<span dir="ltr">K</span>ö<span dir="ltr">ster</span> <span dir="ltr">and</span> <span dir="ltr">Rahmann</span> 2012 ) اجرا کرد.

__<span dir="ltr">KEEP_BIDI_00000__</span> زیر برای کمی‌سازی هشت نمونه‌ای به‌کار رفت که از <span dir="ltr">SRA</span> دانلود شده بودند (شناسهٔ <span dir="ltr">SRR</span> همان شناسهٔ اجرا است، و برای این هشت نمونه، تنها یک اجرا به‌ازای هر نمونه وجود داشت).

```
DATASETS = ["SRR1039508",
            "SRR1039509",
            "SRR1039512",
            "SRR1039513",
            "SRR1039516",
            "SRR1039517",
            "SRR1039520",
            "SRR1039521"]

SALMON = "/path/to/salmon_0.14.1/bin/salmon"

rule all:
  input: expand("quants/{dataset}/quant.sf", dataset=DATASETS)

rule salmon_quant:
    input:
        r1 = "fastq/{sample}_1.fastq.gz",
        r2 = "fastq/{sample}_2.fastq.gz",
        index = "/path/to/gencode.v29_salmon_0.14.1"
    output:
        "quants/{sample}/quant.sf"
    params:
        dir = "quants/{sample}"
    shell:
        "{SALMON} quant -i {input.index} -l A -p 6 --validateMappings \
         --gcBias --numGibbsSamples 20 -o {params.dir} \
         -1 {input.r1} -2 {input.r2}"
```

خط آخر، خط کلیدی‌ای است که _<span dir="ltr">Salmon_</span> را اجرا می‌کند. این خط می‌گوید با استفاده از یک نمایهٔ مشخص، با تشخیص خودکار نوع کتابخانه، با به‌کارگیری 6 ترد، با گزینهٔ <span dir="ltr">validate</span> <span dir="ltr">mappings</span> (این گزینه در نسخه‌های _<span dir="ltr">Salmon_</span> \\(\\<span dir="ltr">ge</span>\\) 0\.99 پیش‌فرض است)، با تصحیح بایاس <span dir="ltr">GC</span>، و با نوشتن 20 نمونهٔ گیبس (این مورد اختیاری است) کمی‌سازی انجام شود. سه آرگومان پایانی، پوشهٔ خروجی و دو فایل خوانشِ جفت‌شده را مشخص می‌کنند.

فایل <span dir="ltr">Snakemake</span> فوق مستلزم آن است که یک نمایه در __<span dir="ltr">KEEP_BIDI_00000__</span> ساخته شود؛ جایی که <span dir="ltr">VV</span> و <span dir="ltr">X</span>,<span dir="ltr">Y</span>,<span dir="ltr">Z</span> باید به مشخص کردن ویرایش رونوشت‌های مرجع و نسخهٔ _<span dir="ltr">Salmon_</span> کمک کنند.
برای رونوشت‌های مرجع انسان و موش، توصیه می‌کنیم از [<span dir="ltr">GENCODE](https://gencodegenes.org/)</span> (<span dir="ltr">Frankish</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2018 ) استفاده شود.

نمایهٔ _<span dir="ltr">Salmon_</span> را می‌توان به‌سادگی با دستور زیر ساخت:

```
salmon index -t transcripts.fa.gz -i name_of_index
```

**نکته:** _<span dir="ltr">Salmon_</span> می‌تواند هنگام نمایه‌سازی از _<span dir="ltr">decoy</span> <span dir="ltr">sequences_</span> (دنباله‌های دیکوی) نیز استفاده کند، همان‌گونه که در <span dir="ltr">Srivastava</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> ( 2020 ) توصیف شده و نشان داده شده که دقت کمی‌سازی را بهبود می‌دهد. برای جزئیات بیشتر دربارهٔ نحوهٔ استفاده از دنباله‌های دیکوی در نرم‌افزار _<span dir="ltr">Salmon_</span> لطفاً این یادداشت را در [<span dir="ltr">Salmon</span> <span dir="ltr">documentation](https://salmon.readthedocs.io/en/latest/salmon.html)</span> ببینید. در این‌جا، نگاشت خوانش‌ها به ترنسکریپتوم را بدون دنباله‌های دیکوی ادامه می‌دهیم. هنگام نمایه‌سازی، پیامی ظاهر خواهد شد مبنی بر این‌که نمایهٔ _<span dir="ltr">Salmon_</span> بدون هیچ دنبالهٔ دیکویی ساخته می‌شود.

اگر رونوشت‌ها از <span dir="ltr">GENCODE</span> دانلود شده‌اند، توصیه می‌شود از دستوری مشابه دستور زیر استفاده شود (که صرفاً به حذف اطلاعات افزوده از نام رونوشت‌ها کمک می‌کند):

```
salmon index --gencode -t gencode.v29.transcripts.fa.gz \
  -i gencode.v29_salmon_X.Y.Z
```

فایل <span dir="ltr">Snakemake</span> فوق را می‌توان سپس به روش‌های مختلف [<span dir="ltr">execute</span> <span dir="ltr">Snakemake](https://snakemake.readthedocs.io/en/stable/executing/cli.html)</span> کرد، از جمله ارسال چندین کار به یک کلاستر محاسباتی یا در فضای ابری. فایل <span dir="ltr">Snakemake</span> فوق، پس از ویرایش برای بازتاب مسیرهای واقعی منابع، روی یک کلاستر با زمان‌بند <span dir="ltr">SLURM</span> اجرا شد، با خط زیر در یک کار جداگانه که به کلاستر ارسال شد:

```
snakemake -j 4 --latency-wait 30 --cluster "sbatch -N 1 -n 6"
```

این دستور فرض می‌کند که دستورالعمل‌های <span dir="ltr">Snakemake</span> در فایلی به نام «<span dir="ltr">Snakefile</span>» قرار دارند.
گزینه‌های استفاده‌شده در این‌جا شامل موارد زیر است:

* __<span dir="ltr">KEEP_BIDI_00000__</span> : حداکثر تعداد کارهایی که به‌صورت موازی اجرا می‌شوند
* __<span dir="ltr">KEEP_BIDI_00000__</span> : تعداد ثانیه‌های مجاز برای در دسترس شدن فایل جهت آغاز گام‌های بعدی، در صورت وجود تأخیر
* __<span dir="ltr">KEEP_BIDI_00000__</span> : [در <span dir="ltr">readthedocs.io</span> وجود ندارد؟]
* گزینهٔ «-<span dir="ltr">s</span>» را می‌توان برای اجرای <span dir="ltr">snakemake</span> روی فایلی با نام مشخص استفاده کرد («<span dir="ltr">Snakefile</span>» پیش‌فرض است)

## ۲٫۳ خواندن داده‌ها با _<span dir="ltr">tximeta_</span>

در ادامهٔ جریان‌کار، شیئی را بارگذاری خواهیم کرد که شامل
داده‌های کمی‌سازی در سطح <span dir="ltr">gene</span> (ژن) برای هر هشت نمونه. با این حال، بستهٔ _[<span dir="ltr">airway](https://bioconductor.org/packages/3.23/airway)_</span> همچنین شامل دو پوشهٔ کمی‌سازیِ خروجی‌شده توسط _<span dir="ltr">Salmon_</span> است تا نشان دهیم چگونه می‌توان این داده را در <span dir="ltr">R/Bioconductor</span> وارد کرد. برای کوچک‌تر نگه‌داشتن اندازهٔ بستهٔ داده، فایل‌های __<span dir="ltr">KEEP_BIDI_00001__</span> در پوشه‌های کمی‌سازی فشرده‌سازی (<span dir="ltr">gzip</span>) شده‌اند؛ بنابراین در جاهایی که در ادامه __<span dir="ltr">KEEP_BIDI_00002__</span> می‌بینید، احتمالاً روی رایانهٔ خود از __<span dir="ltr">KEEP_BIDI_00003__</span> استفاده خواهید کرد.

پس از نمایش واردسازی با _<span dir="ltr">tximeta_</span>، ماتریس کامل <span dir="ltr">count</span> (شمارش) متناظر با همهٔ نمونه‌ها و کل داده را که از پیش در همان بسته فراهم شده است بارگذاری می‌کنیم و تحلیل را با همان شیء دادهٔ کامل ادامه می‌دهیم.

ابتدا بستهٔ داده شامل دادهٔ نمونه را بارگذاری می‌کنیم:

```
library("airway")
```

تابع _<span dir="ltr">system.file_</span> در <span dir="ltr">R</span> می‌تواند محل نصب فایل‌های یک بسته روی رایانهٔ شما را بیابد. در اینجا مسیر کامل پوشهٔ __<span dir="ltr">KEEP_BIDI_00000__</span> را که محل نگهداری داده‌های خارجیِ بسته‌های <span dir="ltr">R</span> است و بخشی از بستهٔ _[<span dir="ltr">airway](https://bioconductor.org/packages/3.23/airway)_</span> محسوب می‌شود، درخواست می‌کنیم.

```
dir <- system.file("extdata", package="airway", mustWork=TRUE)
```

در این پوشه، تعدادی فایل می‌یابیم؛ از جمله هشت فایل <span dir="ltr">BAM</span> که در نسخهٔ پیشین این گردش‌کار برای نشان‌دادن هم‌ترازسازی و شمارش به‌کار رفته بودند. تمرکز ما بر دو پوشه‌ای است که در مسیر __<span dir="ltr">KEEP_BIDI_00000__</span> قرار دارند و خروجی _<span dir="ltr">Salmon_</span> بر روی دو فایل را در خود دارند.

```
list.files(dir)
```

```
##  [1] "GSE52778_series_matrix.txt"        "Homo_sapiens.GRCh37.75_subset.gtf"
##  [3] "SRR1039508_subset.bam"             "SRR1039509_subset.bam"            
##  [5] "SRR1039512_subset.bam"             "SRR1039513_subset.bam"            
##  [7] "SRR1039516_subset.bam"             "SRR1039517_subset.bam"            
##  [9] "SRR1039520_subset.bam"             "SRR1039521_subset.bam"            
## [11] "SraRunInfo_SRP033351.csv"          "quants"                           
## [13] "sample_table.csv"
```

```
list.files(file.path(dir, "quants"))
```

```
## [1] "SRR1039508" "SRR1039509"
```

به‌طور معمول، جدولی شامل اطلاعات تفصیلی برای هر یک از نمونه‌ها داریم که آن‌ها را به فایل‌های <span dir="ltr">FASTQ</span> و پوشه‌های مربوط به _<span dir="ltr">Salmon_</span> متصل می‌کند. برای پروژهٔ خود می‌توانید چنین فایلی با قالب مقادیر جداشده با کاما (<span dir="ltr">CSV</span>) را با یک ویرایشگر متن یا نرم‌افزار صفحه‌گسترده مانند <span dir="ltr">Excel</span> بسازید.

چنین فایل <span dir="ltr">CSV</span>‌ای را با _<span dir="ltr">read.csv_</span> بارگذاری می‌کنیم:

```
csvfile <- file.path(dir, "sample_table.csv")
coldata <- read.csv(csvfile, row.names=1, stringsAsFactors=FALSE)
coldata
```

```
##            SampleName    cell   dex albut        Run avgLength Experiment
## SRR1039508 GSM1275862  N61311 untrt untrt SRR1039508       126  SRX384345
## SRR1039509 GSM1275863  N61311   trt untrt SRR1039509       126  SRX384346
## SRR1039512 GSM1275866 N052611 untrt untrt SRR1039512       126  SRX384349
## SRR1039513 GSM1275867 N052611   trt untrt SRR1039513        87  SRX384350
## SRR1039516 GSM1275870 N080611 untrt untrt SRR1039516       120  SRX384353
## SRR1039517 GSM1275871 N080611   trt untrt SRR1039517       126  SRX384354
## SRR1039520 GSM1275874 N061011 untrt untrt SRR1039520       101  SRX384357
## SRR1039521 GSM1275875 N061011   trt untrt SRR1039521        98  SRX384358
##               Sample    BioSample
## SRR1039508 SRS508568 SAMN02422669
## SRR1039509 SRS508567 SAMN02422675
## SRR1039512 SRS508571 SAMN02422678
## SRR1039513 SRS508572 SAMN02422670
## SRR1039516 SRS508575 SAMN02422682
## SRR1039517 SRS508576 SAMN02422673
## SRR1039520 SRS508579 SAMN02422683
## SRR1039521 SRS508580 SAMN02422677
```

برای نشان‌دادنِ واردسازی داده‌های کمی‌سازیِ _<span dir="ltr">Salmon_</span> به <span dir="ltr">R</span>، تنها با دو نمونه‌ای کار می‌کنیم که در بستهٔ _<span dir="ltr">airway_</span> ارائه شده‌اند. یک ستون به نام __<span dir="ltr">KEEP_BIDI_00000__</span> و ستونی دیگر به نام __<span dir="ltr">KEEP_BIDI_00001__</span> می‌سازیم:

```
coldata <- coldata[1:2,]
coldata$names <- coldata$Run
coldata$files <- file.path(dir, "quants", coldata$names, "quant.sf.gz")
file.exists(coldata$files)
```

```
## [1] TRUE TRUE
```

اکنون بستهٔ _<span dir="ltr">tximeta_</span> را بارگذاری و تابع اصلی آن را اجرا می‌کنیم:

```
library("tximeta")
se <- tximeta(coldata)
```

```
## importing salmon quantification files
```

```
## reading in files with read_tsv
```

```
## 1 2 
## found matching transcriptome:
## [ GENCODE - Homo sapiens - release 29 ]
## useHub=TRUE: checking for TxDb via 'AnnotationHub'
## found matching TxDb via 'AnnotationHub'
## loading from cache
## Loading required package: GenomicFeatures
## Loading required package: AnnotationDbi
## generating transcript ranges
```

اگر _<span dir="ltr">tximeta_</span> کدِ کنترلی (<span dir="ltr">checksum</span>) ترنسکریپتومِ مرجع را تشخیص داده باشد (جزئیات در وینگت _[<span dir="ltr">tximeta](https://bioconductor.org/packages/3.23/tximeta)_</span>) و اتصال اینترنتی فعال داشته باشیم، _<span dir="ltr">tximeta_</span> داده‌های حاشیه‌نویسی مرتبط را از منابع مختلف یافته و بارگیری خواهد کرد. چند نکته: داده‌های حاشیه‌نویسی فقط یک‌بار بارگیری و تجزیه می‌شوند و از آن پس، در صورت نیاز، نسخه‌های ذخیره‌شده در نهانگاه محلیِ فرا‌داده استفاده خواهد شد (اگر برای بار دوم داده‌ای را بارگذاری کنید که در برابر همان <span dir="ltr">transcript</span> (رونوشت)‌های مرجع کمی‌سازی شده است). همچنین، در اولین اجرا، _<span dir="ltr">tximeta_</span> از شما می‌خواهد محل پیش‌فرض نهانگاه را تأیید کنید (مطابق الگوی مکان نهانگاه که در سایر بسته‌های <span dir="ltr">R</span> و <span dir="ltr">Bioconductor</span> نیز به‌کار می‌رود). این مکان را می‌توانید هر زمان بعداً تغییر دهید.

در بخش بعدی دربارهٔ ساختار شیء __<span dir="ltr">KEEP_BIDI_00000__</span> بحث خواهیم کرد، اما فعلاً صرفاً به ابعاد آن نگاه می‌کنیم. توجه داشته باشید که _<span dir="ltr">tximeta_</span> داده را در سطح رونوشت وارد می‌کند.

```
dim(se)
```

```
## [1] 205870      2
```

```
head(rownames(se))
```

```
## [1] "ENST00000456328.2" "ENST00000450305.2" "ENST00000488147.1"
## [4] "ENST00000619216.1" "ENST00000473358.1" "ENST00000469289.1"
```

از آنجا که این گردش‌کار بر تحلیل در سطح ژن متمرکز است، اکنون کمی‌سازی‌های سطح رونوشت را به سطح ژن خلاصه می‌کنیم (که درونی از روش‌های موجود در _<span dir="ltr">tximport_</span> (<span dir="ltr">Soneson</span>, <span dir="ltr">Love</span>, <span dir="ltr">and</span> <span dir="ltr">Robinson</span> 2015) بهره می‌گیرد). نگاشت صحیحِ رونوشت‌به-ژن به‌طور خودکار بر پایهٔ فرا‌دادهٔ ذخیره‌شده درون شیء __<span dir="ltr">KEEP_BIDI_00000__</span> ساخته می‌شود.

```
gse <- summarizeToGene(se)
```

```
## loading existing TxDb created: 2026-06-02 17:09:55
```

```
## obtaining transcript-to-gene mapping from database
```

```
## generating gene ranges
```

```
## assignRanges='range': gene ranges assigned by total range of isoforms
##   see details at: ?summarizeToGene,SummarizedExperiment-method
```

```
## summarizing abundance
```

```
## summarizing counts
```

```
## summarizing length
```

اکنون می‌توانیم بررسی کنیم که ابعاد کاهش یافته و شناسه‌های سطرها اکنون شناسه‌های ژن هستند:

```
dim(gse)
```

```
## [1] 58294     2
```

```
head(rownames(gse))
```

```
## [1] "ENSG00000000003.14" "ENSG00000000005.5"  "ENSG00000000419.12"
## [4] "ENSG00000000457.13" "ENSG00000000460.16" "ENSG00000000938.12"
```

## ۲٫۴ توابع واردسازی _<span dir="ltr">DESeq2_</span>

هرچند بخش بالا به کاربرد _<span dir="ltr">Salmon_</span> و _<span dir="ltr">tximeta_</span> اختصاص داشت، ورودی‌های ممکن متعددی برای _<span dir="ltr">DESeq2_</span> وجود دارد که هر یک توابع واردسازیِ ویژهٔ خود را دارند.
ابزارهای زیر می‌توانند داده‌های شمارش را برای استفاده در _<span dir="ltr">DESeq2_</span> تولید یا تجمیع کنند: _<span dir="ltr">tximport_</span> (<span dir="ltr">Soneson</span>, <span dir="ltr">Love</span>, <span dir="ltr">and</span> <span dir="ltr">Robinson</span> 2015)، _<span dir="ltr">tximeta_</span> (<span dir="ltr">Love</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2020)، _<span dir="ltr">htseq-count_</span> (<span dir="ltr">Anders</span>, <span dir="ltr">Pyl</span>, <span dir="ltr">and</span> <span dir="ltr">Huber</span> 2015)، _<span dir="ltr">featureCounts_</span> (<span dir="ltr">Liao</span>, <span dir="ltr">Smyth</span>, <span dir="ltr">and</span> <span dir="ltr">Shi</span> 2014)، _<span dir="ltr">summarizeOverlaps_</span> (<span dir="ltr">Lawrence</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2013).

|تابع |بسته |چارچوب |خروجی |تابع ورودی برای _<span dir="ltr">DESeq2_</span> |
| --- | --- | --- | --- | --- |
|_<span dir="ltr">tximport_</span> |_[<span dir="ltr">tximport](https://bioconductor.org/packages/3.23/tximport)_</span> |<span dir="ltr">R/Bioconductor</span> |فهرستی از ماتریس‌ها |_<span dir="ltr">DESeqDataSetFromTximport_</span> |
|_<span dir="ltr">tximeta_</span> |_[<span dir="ltr">tximeta](https://bioconductor.org/packages/3.23/tximeta)_</span> |<span dir="ltr">R/Bioconductor</span> |_<span dir="ltr">SummarizedExperiment_</span> |_<span dir="ltr">DESeqDataSet_</span> |
|_<span dir="ltr">htseq-count_</span> |[<span dir="ltr">HTSeq](http://www-huber.embl.de/users/anders/HTSeq)</span> |<span dir="ltr">Python</span> |فایل‌ها |_<span dir="ltr">DESeqDataSetFromHTSeq_</span> |
|_<span dir="ltr">featureCounts_</span> |_[<span dir="ltr">Rsubread](https://bioconductor.org/packages/3.23/Rsubread)_</span> |<span dir="ltr">R/Bioconductor</span> |ماتریس |_<span dir="ltr">DESeqDataSetFromMatrix_</span> |
|_<span dir="ltr">summarizeOverlaps_</span> |_[<span dir="ltr">GenomicAlignments](https://bioconductor.org/packages/3.23/GenomicAlignments)_</span> |<span dir="ltr">R/Bioconductor</span> |_<span dir="ltr">SummarizedExperiment_</span> |_<span dir="ltr">DESeqDataSet_</span> |

در ادامه، کلاس شیئی را که _<span dir="ltr">tximeta_</span> می‌سازد و در بالا به‌صورت __<span dir="ltr">KEEP_BIDI_00000__</span> و __<span dir="ltr">KEEP_BIDI_00001__</span> ذخیره شد توصیف می‌کنیم، و این‌که چگونه از آن برای استفاده در _<span dir="ltr">DESeq2_</span> یک شیء _<span dir="ltr">DESeqDataSet_</span> بسازیم (سایر توابعِ بالا نیز یک _<span dir="ltr">DESeqDataSet_</span> ایجاد می‌کنند).

## ۲٫۵ شیء _<span dir="ltr">SummarizedExperiment_</span>

**اجزای سازندهٔ یک شیء _<span dir="ltr">SummarizedExperiment_.</span>** __<span dir="ltr">KEEP_BIDI_00000__</span> (بلوک صورتی) شامل ماتریس شمارش است، __<span dir="ltr">KEEP_BIDI_00001__</span> (بلوک آبی) اطلاعات مربوط به بازه‌های ژنومی را دربر می‌گیرد و __<span dir="ltr">KEEP_BIDI_00002__</span> (بلوک سبز) اطلاعات مربوط به نمونه‌ها را شامل می‌شود. خط هایلایت‌شده در هر بلوک نشان‌دهندهٔ سطر نخست است (توجه کنید که سطر نخستِ __<span dir="ltr">KEEP_BIDI_00003__</span> با ستون نخستِ __<span dir="ltr">KEEP_BIDI_00004__</span> هم‌تراز است).

محفظهٔ _<span dir="ltr">SummarizedExperiment_</span> در شکل بالا ترسیم شده و در تازه‌ترین مقالهٔ <span dir="ltr">Bioconductor</span> (<span dir="ltr">Huber</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2015) بحث شده است. در مورد ما، _<span dir="ltr">tximeta_</span> شیئی به نام __<span dir="ltr">KEEP_BIDI_00000__</span> با سه ماتریس ساخته است: «<span dir="ltr">counts</span>» — شمارش‌های برآوردیِ قطعه‌ها برای هر ژن و هر نمونه؛ «<span dir="ltr">abundance</span>» — <span dir="ltr">abundance</span> (فراوانی) برآوردیِ رونوشت‌ها برحسب <span dir="ltr">TPM</span>؛ و «<span dir="ltr">length</span>» — طول‌های مؤثر ژن که تغییرات طول ناشی از سوگیری‌ها و نیز ناشی از الگوی استفاده از رونوشت‌ها را دربر می‌گیرند. نام آزمون‌ها را می‌توان با _<span dir="ltr">assayNames_</span> مشاهده کرد و خودِ آزمون‌ها به‌صورت __<span dir="ltr">KEEP_BIDI_00001__</span> (فهرستی از ماتریس‌ها) نگهداری می‌شوند. نخستین ماتریسِ این فهرست را می‌توان با __<span dir="ltr">KEEP_BIDI_00002__</span> بیرون کشید. __<span dir="ltr">KEEP_BIDI_00003__</span> برای شیء ما _<span dir="ltr">GRanges_</span> ژن‌هاست (از چپ‌ترین موقعیتِ همهٔ رونوشت‌ها تا راست‌ترین موقعیتِ آن‌ها).
اجزای سازنده‌ی _<span dir="ltr">SummarizedExperiment_</span> با تابع هم‌نام در <span dir="ltr">R</span> در دسترس‌اند: __<span dir="ltr">KEEP_BIDI_00000__</span> (یا __<span dir="ltr">KEEP_BIDI_00001__</span>)، __<span dir="ltr">KEEP_BIDI_00002__</span> و __<span dir="ltr">KEEP_BIDI_00003__.</span>

اکنون ماتریس کامل <span dir="ltr">count</span> (شمارش) متناظر با همهٔ نمونه‌ها و همهٔ داده‌ها را که در بستهٔ _<span dir="ltr">airway_</span> فراهم شده است بارگذاری می‌کنیم و تحلیل را با شیء کامل داده ادامه می‌دهیم. توجه کنید که اطلاعات مربوط به اهداکنندهٔ ردهٔ سلولی و تیمار با دگزامتازون اکنون ستون‌های __<span dir="ltr">KEEP_BIDI_00000__</span> و __<span dir="ltr">KEEP_BIDI_00001__</span> از فرادادهٔ ستون‌ها هستند.

می‌توانیم این شیء _<span dir="ltr">SummarizedExperiment_</span> را با نگاه کردن به ماتریس‌ها در شکاف __<span dir="ltr">KEEP_BIDI_00000__</span>، داده‌های فنوتیپی دربارهٔ نمونه‌ها در شکاف __<span dir="ltr">KEEP_BIDI_00001__</span>، و داده‌های مربوط به <span dir="ltr">gene</span> (ژن)‌ها در شکاف __<span dir="ltr">KEEP_BIDI_00002__</span> بررسی کنیم.

```
data(gse)
gse
```

```
## class: RangedSummarizedExperiment 
## dim: 58294 8 
## metadata(6): tximetaInfo quantInfo ... txomeInfo txdbInfo
## assays(3): counts abundance length
## rownames(58294): ENSG00000000003.14 ENSG00000000005.5 ...
##   ENSG00000285993.1 ENSG00000285994.1
## rowData names(1): gene_id
## colnames(8): SRR1039508 SRR1039509 ... SRR1039520 SRR1039521
## colData names(3): names donor condition
```

شمارش‌ها نخستین ماتریس هستند، پس می‌توانیم آن‌ها را تنها با __<span dir="ltr">KEEP_BIDI_00000__</span> بررسی کنیم:

```
assayNames(gse)
```

```
## [1] "counts"    "abundance" "length"
```

```
head(assay(gse), 3)
```

```
##                    SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516
## ENSG00000000003.14    708.164    467.962    900.992    424.368   1188.295
## ENSG00000000005.5       0.000      0.000      0.000      0.000      0.000
## ENSG00000000419.12    455.000    510.000    604.000    352.000    583.000
##                    SRR1039517 SRR1039520 SRR1039521
## ENSG00000000003.14   1090.668    805.929    599.337
## ENSG00000000005.5       0.000      0.000      0.000
## ENSG00000000419.12    773.999    409.999    499.000
```

```
colSums(assay(gse))
```

```
## SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516 SRR1039517 SRR1039520 
##   21100805   19298584   26145537   15688246   25268618   31891456   19683767 
## SRR1039521 
##   21813903
```

هنگام چاپ __<span dir="ltr">KEEP_BIDI_00000__</span>، بازه‌ها برای پنج ژن نخست و پنج ژن آخر نشان داده می‌شوند:

```
rowRanges(gse)
```

```
## GRanges object with 58294 ranges and 1 metadata column:
##                      seqnames              ranges strand |            gene_id
##                         <Rle>           <IRanges>  <Rle> |        <character>
##   ENSG00000000003.14     chrX 100627109-100639991      - | ENSG00000000003.14
##    ENSG00000000005.5     chrX 100584802-100599885      + |  ENSG00000000005.5
##   ENSG00000000419.12    chr20   50934867-50958555      - | ENSG00000000419.12
##   ENSG00000000457.13     chr1 169849631-169894267      - | ENSG00000000457.13
##   ENSG00000000460.16     chr1 169662007-169854080      + | ENSG00000000460.16
##                  ...      ...                 ...    ... .                ...
##    ENSG00000285990.1    chr14   19244904-19269380      - |  ENSG00000285990.1
##    ENSG00000285991.1     chr6 149817937-149896011      - |  ENSG00000285991.1
##    ENSG00000285992.1     chr8   47129262-47132628      + |  ENSG00000285992.1
##    ENSG00000285993.1    chr18   46409197-46410645      - |  ENSG00000285993.1
##    ENSG00000285994.1    chr10   12563151-12567351      + |  ENSG00000285994.1
##   -------
##   seqinfo: 25 sequences (1 circular) from hg38 genome
```

همچنین __<span dir="ltr">KEEP_BIDI_00000__</span> در شکاف __<span dir="ltr">KEEP_BIDI_00001__</span> فراداده‌ای دربارهٔ توالی‌ها (در این‌جا کروموزوم‌ها) دارد:

```
seqinfo(rowRanges(gse))
```

```
## Seqinfo object with 25 sequences (1 circular) from hg38 genome:
##   seqnames seqlengths isCircular genome
##   chr1      248956422      FALSE   hg38
##   chr2      242193529      FALSE   hg38
##   chr3      198295559      FALSE   hg38
##   chr4      190214555      FALSE   hg38
##   chr5      181538259      FALSE   hg38
##   ...             ...        ...    ...
##   chr21      46709983      FALSE   hg38
##   chr22      50818468      FALSE   hg38
##   chrX      156040895      FALSE   hg38
##   chrY       57227415      FALSE   hg38
##   chrM          16569       TRUE   hg38
```

__<span dir="ltr">KEEP_BIDI_00000__</span> برای _<span dir="ltr">SummarizedExperiment_</span> بازتاب‌دهندهٔ _<span dir="ltr">data.frame_</span>ای است که به تابع __<span dir="ltr">KEEP_BIDI_00001__</span> برای وارد کردن داده‌های کمی‌سازی داده شده بود. در این‌جا می‌بینیم که ستون‌هایی برای نام نمونه‌ها، همچنین شناسهٔ اهداکننده و وضعیت تیمار (تیمار با دگزامتازون یا بدون تیمار) وجود دارد.

```
colData(gse)
```

```
## DataFrame with 8 rows and 3 columns
##                 names    donor     condition
##              <factor> <factor>      <factor>
## SRR1039508 SRR1039508  N61311  Untreated    
## SRR1039509 SRR1039509  N61311  Dexamethasone
## SRR1039512 SRR1039512  N052611 Untreated    
## SRR1039513 SRR1039513  N052611 Dexamethasone
## SRR1039516 SRR1039516  N080611 Untreated    
## SRR1039517 SRR1039517  N080611 Dexamethasone
## SRR1039520 SRR1039520  N061011 Untreated    
## SRR1039521 SRR1039521  N061011 Dexamethasone
```

## ۲٫۶ نقطهٔ انشعاب

در این مرحله، قطعه‌هایی را که با ژن‌ها در مدل ژنی مشخص‌شده هم‌پوشانی داشتند شمرده‌ایم. این یک نقطهٔ انشعاب است که در آن می‌توان از انواع بسته‌های <span dir="ltr">Bioconductor</span> برای کاوش و <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) داده‌های شمارش استفاده کرد، از جمله _[<span dir="ltr">edgeR](https://bioconductor.org/packages/3.23/edgeR)_</span> (<span dir="ltr">Robinson</span>, <span dir="ltr">McCarthy</span>, <span dir="ltr">and</span> <span dir="ltr">Smyth</span> 2009)، _[<span dir="ltr">limma](https://bioconductor.org/packages/3.23/limma)_</span> با روش <span dir="ltr">voom</span> (<span dir="ltr">Law</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2014)، _[<span dir="ltr">DSS](https://bioconductor.org/packages/3.23/DSS)_</span> (<span dir="ltr">Wu</span>, <span dir="ltr">Wang</span>, <span dir="ltr">and</span> <span dir="ltr">Wu</span> 2013)، _[<span dir="ltr">EBSeq](https://bioconductor.org/packages/3.23/EBSeq)_</span> (<span dir="ltr">Leng</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2013) و _[<span dir="ltr">baySeq](https://bioconductor.org/packages/3.23/baySeq)_</span> (<span dir="ltr">Hardcastle</span> <span dir="ltr">and</span> <span dir="ltr">Kelly</span> 2010). <span dir="ltr">Schurch</span> و همکاران (2016) [عملکرد__<span dir="ltr">KEEP_BIDI_00005__</span> روش‌های آماری مختلف برای <span dir="ltr">RNA-seq</span> را با تعداد زیادی تکرار زیستی مقایسه کردند و می‌تواند به کاربران کمک کند تصمیم بگیرند کدام ابزارها معقول است استفاده شوند و برای دستیابی به حساسیت معینی به چند تکرار زیستی نیاز است. ما با _[<span dir="ltr">DESeq2](https://bioconductor.org/packages/3.23/DESeq2)_</span> (<span dir="ltr">Love</span>, <span dir="ltr">Huber</span>, <span dir="ltr">and</span> <span dir="ltr">Anders</span> 2014) ادامه خواهیم داد. شیء _<span dir="ltr">SummarizedExperiment_</span> تمام چیزی است که برای شروع تحلیل نیاز داریم. در بخش بعدی نشان می‌دهیم چگونه با استفاده از آن شیء دادهٔ مورد استفادهٔ _[<span dir="ltr">DESeq2](https://bioconductor.org/packages/3.23/DESeq2)_</span> را بسازیم.

# 3 شیء _<span dir="ltr">DESeqDataSet_</span>، اطلاعات نمونه و فرمول طراحی

بسته‌های نرم‌افزاری <span dir="ltr">Bioconductor</span> اغلب یک کلاس سفارشی برای نگه‌داری داده‌ها تعریف و استفاده می‌کنند تا مطمئن شوند همهٔ شکاف‌های داده‌ای لازم به‌طور یکنواخت فراهم شده و شرایط را برآورده می‌کنند. افزون بر این، <span dir="ltr">Bioconductor</span> کلاس‌های داده‌ای عمومی (مانند _<span dir="ltr">SummarizedExperiment_</span>) دارد که می‌توان از آن‌ها برای جابه‌جایی داده‌ها بین بسته‌ها استفاده کرد. همچنین کلاس‌های هسته‌ای <span dir="ltr">Bioconductor</span> قابلیت‌های مفیدی فراهم می‌کنند: برای نمونه، زیرمجموعه‌گیری یا بازچینی سطرها یا ستون‌های یک _<span dir="ltr">SummarizedExperiment_</span> به‌طور خودکار _<span dir="ltr">rowRanges_</span> و _<span dir="ltr">colData_</span> متناظر را نیز زیرمجموعه‌گیری یا بازچینی می‌کند، که می‌تواند از جابه‌جایی تصادفی نمونه‌ها که در غیر این صورت به نتایج گمراه‌کننده منجر می‌شد جلوگیری کند. با _<span dir="ltr">SummarizedExperiment_</span> همهٔ این‌ها در پس‌زمینه رسیدگی می‌شود.

در _<span dir="ltr">DESeq2_</span>، کلاس سفارشی _<span dir="ltr">DESeqDataSet_</span> نام دارد. این کلاس بر پایهٔ _<span dir="ltr">SummarizedExperiment_</span> ساخته شده است و تبدیل اشیای _<span dir="ltr">SummarizedExperiment_</span> به _<span dir="ltr">DESeqDataSet_</span> آسان است، که در ادامه نشان می‌دهیم. یکی از دو تفاوت اصلی این است که شکاف __<span dir="ltr">KEEP_BIDI_00000__</span> به‌جای خود با استفاده از تابع دسترسی _<span dir="ltr">counts_</span> در دسترس است و کلاس _<span dir="ltr">DESeqDataSet_</span> اعمال می‌کند که مقادیر این ماتریس اعداد صحیح نامنفی باشند.

تفاوت دوم این است که _<span dir="ltr">DESeqDataSet_</span> یک «فرمول طراحی» همراه دارد. طرح آزمایشی در ابتدای تحلیل تعیین می‌شود، زیرا به بسیاری از توابع _<span dir="ltr">DESeq2_</span> اطلاع می‌دهد که با نمونه‌ها در تحلیل چگونه رفتار کنند (یک استثناء، برآورد عامل اندازه است؛ یعنی تعدیل برای اندازه‌های متفاوت کتابخانه‌ها که به فرمول طراحی وابسته نیست). فرمول طراحی مشخص می‌کند کدام ستون‌ها در جدول اطلاعات نمونه (__<span dir="ltr">KEEP_BIDI_00000__</span>) طرح آزمایشی را تعیین می‌کنند و این عوامل چگونه باید در تحلیل به کار روند.

ابتدا، بیایید ستون‌های __<span dir="ltr">KEEP_BIDI_00000__</span> از __<span dir="ltr">KEEP_BIDI_00001__</span> را بررسی کنیم. می‌توان هر یک از ستون‌ها را تنها با استفاده از __<span dir="ltr">KEEP_BIDI_00002__</span> مستقیماً روی _<span dir="ltr">SummarizedExperiment_</span> یا _<span dir="ltr">DESeqDataSet_</span> مشاهده کرد.

```
gse$donor
```

```
## [1] N61311  N61311  N052611 N052611 N080611 N080611 N061011 N061011
## Levels: N052611 N061011 N080611 N61311
```

```
gse$condition
```

```
## [1] Untreated     Dexamethasone Untreated     Dexamethasone Untreated    
## [6] Dexamethasone Untreated     Dexamethasone
## Levels: Untreated Dexamethasone
```

در صورت تمایل می‌توانیم نام متغیرهای خود را عوض کنیم. بیایید از __<span dir="ltr">KEEP_BIDI_00000__</span> برای نشان دادن ردهٔ سلولی اهداکننده و از __<span dir="ltr">KEEP_BIDI_00001__</span> برای نشان دادن وضعیت تیمار استفاده کنیم.

```
gse$cell <- gse$donor
gse$dex <- gse$condition
```

همچنین می‌توانیم نام سطوح را تغییر دهیم. هنگام تغییر نام سطوح، حیاتی است که ترتیب را تغییر ندهیم. در این‌جا __<span dir="ltr">KEEP_BIDI_00000__</span> را به __<span dir="ltr">KEEP_BIDI_00001__</span> و __<span dir="ltr">KEEP_BIDI_00002__</span> را به __<span dir="ltr">KEEP_BIDI_00003__</span> تغییر نام می‌دهیم:

```
levels(gse$dex)
```

```
## [1] "Untreated"     "Dexamethasone"
```

```
# when renaming levels, the order must be preserved!
levels(gse$dex) <- c("untrt", "trt")
```

ساده‌ترین فرمول طراحی برای <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) __<span dir="ltr">KEEP_BIDI_00000__</span> است، که در آن __<span dir="ltr">KEEP_BIDI_00001__</span> ستونی در __<span dir="ltr">KEEP_BIDI_00002__</span> است که مشخص می‌کند نمونه‌ها به کدام‌یک از دو (یا چند) گروه تعلق دارند. برای آزمایش <span dir="ltr">airway</span>، ما __<span dir="ltr">KEEP_BIDI_00003__</span> را مشخص می‌کنیم؛ به این معنا که می‌خواهیم اثر دگزامتازون (__<span dir="ltr">KEEP_BIDI_00004__</span>) را در حالی بیازماییم که برای اثر رده‌های سلولی متفاوت (__<span dir="ltr">KEEP_BIDI_00005__</span>) کنترل می‌کنیم.

توجه: در <span dir="ltr">R</span> ترجیح داده می‌شود سطح نخست یک عامل، سطح مرجع باشد (برای مثال، کنترل یا نمونه‌های بدون تیمار). در این مورد، هنگامی که جدول __<span dir="ltr">KEEP_BIDI_00000__</span> ساخته شد، نمونه‌های بدون تیمار از پیش به‌عنوان مرجع تنظیم شده بودند، اما اگر این‌گونه نبود می‌توانستیم همان‌طور که در پایین نشان داده شده از _<span dir="ltr">relevel_</span> استفاده کنیم. در حالی که __<span dir="ltr">KEEP_BIDI_00001__</span> در بالا صرفاً برای تغییر نام رشته‌های کاراکتری متناظر با سطوح بود، _<span dir="ltr">relevel_</span> تابعی کاملاً متفاوت است که تعیین می‌کند متغیرها چگونه کُدگذاری شوند و <span dir="ltr">contrast</span> (مقایسه)ها چگونه محاسبه شوند. برای یک مقایسهٔ دو-گروهی، استفاده از _<span dir="ltr">relevel_</span> برای تغییر سطح مرجع، علامت ضریب متناظر با یک مقایسه بین دو گروه را معکوس می‌کند.

```
library("magrittr")
gse$dex %<>% relevel("untrt")
gse$dex
```

```
## [1] untrt trt   untrt trt   untrt trt   untrt trt  
## Levels: untrt trt
```

__<span dir="ltr">KEEP_BIDI_00000__</span> عملگر پایپیِ تخصیص مرکب از بستهٔ _[<span dir="ltr">magrittr](https://cran.r-project.org/package=magrittr)_</span> است، خط کد بالا یک
شیوهٔ بیان موجز:

```
gse$dex <- relevel(gse$dex, "untrt")
```

برای اجرای مدل‌های _<span dir="ltr">DESeq2_</span> می‌توانید از نگارش فرمول در <span dir="ltr">R</span> برای بیان هر طرح آزمایشی با اثرات ثابت استفاده کنید. توجه داشته باشید که _<span dir="ltr">DESeq2_</span> همان نگارش فرمولِ تابع _<span dir="ltr">lm_</span> در <span dir="ltr">R</span> پایه را به‌کار می‌گیرد. اگر هدف پژوهش این است که تعیین کنیم برای کدام <span dir="ltr">genes</span> (ژن‌ها) اثرِ تیمار در میان گروه‌ها متفاوت است، می‌توان عبارت‌های برهم‌کنشی را در طرح وارد و با طرحی مانند __<span dir="ltr">KEEP_BIDI_00000__</span> آزمون کرد. برای نمونه‌های بیشتر به صفحهٔ راهنمای __<span dir="ltr">KEEP_BIDI_00001__</span> مراجعه کنید. در ادامه نشان می‌دهیم که چگونه می‌توان از یک عبارت برهم‌کنشی برای آزمون تغییرات وابسته به شرط در طول زمان، در یک مثال دورهٔ زمانی، استفاده کرد.

در بخش‌های بعدی، ساخت یک _<span dir="ltr">DESeqDataSet_</span> را از دو نقطهٔ شروع نشان می‌دهیم:

* از یک شیء _<span dir="ltr">SummarizedExperiment_</span>
* از یک ماتریس <span dir="ltr">count</span> (شمارش) و یک جدول اطلاعات نمونه

برای یک مثال کامل از استفاده از بستهٔ پایتونی _<span dir="ltr">HTSeq_</span> برای شمارش <span dir="ltr">read</span> (خوانش)، به وینیتِ _[<span dir="ltr">pasilla](https://bioconductor.org/packages/3.23/pasilla)_</span> مراجعه کنید. برای مثالی از ساخت _<span dir="ltr">DESeqDataSet_</span> از فایل‌هایی که به‌وسیلهٔ _<span dir="ltr">htseq-count_</span> تولید شده‌اند، به وینیتِ _[<span dir="ltr">DESeq2](https://bioconductor.org/packages/3.23/DESeq2)_</span> مراجعه کنید.

## ۳٫۱ شروع از _<span dir="ltr">SummarizedExperiment_</span>

دوباره می‌توانیم به‌سرعت میلیون‌ها قطعه‌ای را که _<span dir="ltr">Salmon_</span> می‌تواند به ژن‌ها نگاشت کند بررسی کنیم (آرگومان دوم تابع _<span dir="ltr">round_</span> تعداد رقم‌های اعشاری را مشخص می‌کند).

```
round( colSums(assay(gse)) / 1e6, 1 )
```

```
## SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516 SRR1039517 SRR1039520 
##       21.1       19.3       26.1       15.7       25.3       31.9       19.7 
## SRR1039521 
##       21.8
```

وقتی شیء _<span dir="ltr">SummarizedExperiment_</span> را به‌طور کامل حاشیه‌نویسی کردیم، می‌توانیم یک شیء _<span dir="ltr">DESeqDataSet_</span> از آن بسازیم که نقطهٔ آغاز تحلیل خواهد بود.
در این مرحله یک طرح مناسب برای تحلیل اضافه می‌کنیم:

```
library("DESeq2")
```

```
dds <- DESeqDataSet(gse, design = ~ cell + dex)
```

## ۳٫۲ شروع از ماتریس‌های شمارش

در این بخش نشان می‌دهیم که چگونه یک _<span dir="ltr">DESeqDataSet_</span> را در حالتی می‌سازیم که فقط یک ماتریس شمارش و یک جدول اطلاعات نمونه در اختیار داریم.

توجه: اگر یک _<span dir="ltr">SummarizedExperiment_</span> آماده کرده‌اید باید از این بخش صرف‌نظر کنید. در حالی‌که در بخش پیشین، _<span dir="ltr">DESeqDataSet_</span> را از یک _<span dir="ltr">SummarizedExperiment_</span> می‌ساختیم، اینجا صرفاً برای نمایش، اجزای منفرد (ماتریس شمارش و اطلاعات نمونه) را از _<span dir="ltr">SummarizedExperiment_</span> استخراج می‌کنیم تا دوباره یک شیء جدید بسازیم. در عمل، ماتریس شمارش معمولاً از یک فایل خوانده می‌شود یا شاید با تابعی در <span dir="ltr">R</span> مانند _<span dir="ltr">featureCounts_</span> از بستهٔ _[<span dir="ltr">Rsubread](https://bioconductor.org/packages/3.23/Rsubread)_</span> (<span dir="ltr">Liao</span>, <span dir="ltr">Smyth</span>, <span dir="ltr">and</span> <span dir="ltr">Shi</span> 2014) تولید شود.

اطلاعات در یک شیء _<span dir="ltr">SummarizedExperiment_</span> با توابع دسترسی قابل بازیابی است. برای نمونه، برای دیدن داده‌های واقعی، یعنی در اینجا شمارش قطعه‌ها، از تابع _<span dir="ltr">assay_</span> استفاده می‌کنیم. (تابع _<span dir="ltr">head_</span> خروجی را به چند خط اول محدود می‌کند.)

```
countdata <- round(assays(gse)[["counts"]])
head(countdata, 3)
```

```
##                    SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516
## ENSG00000000003.14        708        468        901        424       1188
## ENSG00000000005.5           0          0          0          0          0
## ENSG00000000419.12        455        510        604        352        583
##                    SRR1039517 SRR1039520 SRR1039521
## ENSG00000000003.14       1091        806        599
## ENSG00000000005.5           0          0          0
## ENSG00000000419.12        774        410        499
```

در این ماتریس شمارش، هر سطر نمایندهٔ یک ژن، هر ستون نمایندهٔ یک کتابخانهٔ <span dir="ltr">RNA</span> توالی‌یابی‌شده است، و مقادیر، شمارش‌های برآوردشدهٔ قطعه‌هایی را می‌دهند که به‌صورت احتمالی در هر کتابخانه به ژن متناظر توسط _<span dir="ltr">Salmon_</span> انتساب یافته‌اند. همچنین دربارهٔ هر یک از نمونه‌ها (ستون‌های ماتریس شمارش) اطلاعاتی داریم. اگر داده‌های شمارش را به روش دیگری وارد کرده‌اید، مثلاً با بارگذاری یک ماتریس شمارش ازپیش‌محاسبه‌شده، بسیار مهم است که به‌صورت دستی بررسی کنید ستون‌های ماتریس شمارش با ردیف‌های جدول اطلاعات نمونه متناظر باشند.

```
coldata <- colData(gse)
```

اکنون همهٔ اجزای لازم برای آماده‌سازی شیء داده‌ها در قالبی مناسب برای تحلیل را در اختیار داریم، یعنی:

* __<span dir="ltr">KEEP_BIDI_00000__</span> : جدولی شامل شمارش‌های قطعه‌ها
* __<span dir="ltr">KEEP_BIDI_00000__</span> : جدولی شامل اطلاعات مربوط به نمونه‌ها

برای ساختن شیء _<span dir="ltr">DESeqDataSet_</span> از ماتریس شمارش‌ها و جدول اطلاعات نمونه، از این دستور استفاده می‌کنیم:

```
ddsMat <- DESeqDataSetFromMatrix(countData = countdata,
                                 colData = coldata,
                                 design = ~ cell + dex)
```

در ادامه با شیئی کار خواهیم کرد که در بخش _<span dir="ltr">SummarizedExperiment_</span> ساخته شد.

# 4 تحلیل اکتشافی و بصری‌سازی

در این جریان کار دو مسیر جداگانه وجود دارد؛ مسیری که ابتدا می‌بینیم شامل دگرگونیِ شمارش‌ها برای کاوش بصریِ روابط میان نمونه‌هاست. در بخش دوم، برای آزمون‌های آماری به شمارش‌های خام اصلی برمی‌گردیم. این موضوع حیاتی است، زیرا روش‌های آزمون آماری برای محاسبهٔ دقت اندازه‌گیری‌ها به داده‌های شمارش اصلی (نه مقیاس‌بندی‌شده یا دگرگون‌شده) تکیه می‌کنند.

## ۴٫۱ پیش‌فیلتر کردن مجموعه‌داده

ماتریس شمارش ما در _<span dir="ltr">DESeqDataSet_</span> شامل سطرهای زیادی با فقط صفر، و افزون بر آن، سطرهای زیادی با صرفاً چند قطعه در مجموع است. برای کاهش اندازهٔ شیء و افزایش سرعت اجرای توابع، می‌توانیم سطرهایی را که فاقد اطلاعات یا تقریباً بی‌اطلاعات دربارهٔ میزان بیان ژن هستند حذف کنیم. در اینجا پیش‌پالایش انجام می‌دهیم تا فقط سطرهایی را نگه داریم که حداقل برای تعدادِ مینیممی از نمونه‌ها، شمارشی دست‌کم ۱۰ دارند. آستانهٔ ۱۰ انتخابی معقول برای <span dir="ltr">RNA-seq</span> توده‌ای است. برای حداقل تعداد نمونه‌ها پیشنهاد می‌شود کوچک‌ترین اندازهٔ گروه مشخص شود؛ برای مثال اینجا در هر گروه ۴ نمونه وجود دارد. اگر گروه‌های گسسته وجود نداشته باشد، می‌توان حداقل تعداد نمونه‌هایی را به‌کار برد که در آن‌ها شمارش‌های ناصفر جالب توجه تلقی می‌شوند. وزن‌دهی/فیلترکردنِ افزوده برای بهبود توان، در گام‌های بعدی جریان کار اعمال خواهد شد.

```
nrow(dds)
```

```
## [1] 58294
```

```
smallestGroupSize <- 4
keep <- rowSums(counts(dds) >= 10) >= smallestGroupSize
dds <- dds[keep,]
nrow(dds)
```

```
## [1] 16637
```

## ۴٫۲ تبدیل تثبیت‌کنندهٔ واریانس و تبدیل <span dir="ltr">rlog</span>

بسیاری از روش‌های آماری متداول برای تحلیل اکتشافیِ داده‌های چندبعدی، مانند خوشه‌بندی و تحلیل مؤلفه‌های اصلی (<span dir="ltr">PCA</span>)، زمانی بهترین کارکرد را دارند که دامنهٔ واریانس در گستره‌های مختلفِ میانگین، به‌طور کلی مشابه باشد. هنگامی که مقدار مورد انتظارِ واریانس تقریباً در میانگین‌های مختلف یکسان است، می‌گوییم داده‌ها _هم‌واریانس_ هستند. بااین‌حال برای شمارش‌های <span dir="ltr">RNA-seq</span>، واریانس مورد انتظار با افزایش میانگین رشد می‌کند. برای نمونه، اگر <span dir="ltr">PCA</span> مستقیماً روی یک ماتریسِ شمارش یا شمارش‌های برآمده از <span dir="ltr">normalization</span> (نرمال‌سازی) انجام شود (مثلاً برای تصحیح تفاوت‌های عمق توالی‌یابی)، نمودار حاصل معمولاً عمدتاً به ژن‌هایی وابسته است که بالاترین شمارش‌ها را دارند، زیرا این ژن‌ها بزرگ‌ترین تفاوت‌های مطلق را میان نمونه‌ها نشان می‌دهند. راهبردی ساده و پرتکرار برای پرهیز از این وضعیت، گرفتن لگاریتمِ مقادیرِ شمارشِ نرمال‌سازی‌شده به‌علاوهٔ یک شبه‌شمارشِ ۱ است؛ بااین‌حال، بسته به انتخاب شبه‌شمارش، این‌بار ژن‌هایی با بسیار کمترین شمارش، سهم زیادی از نویز را به نمودار حاصل می‌افزایند، زیرا گرفتن لگاریتم از شمارش‌های کوچک، واریانس‌شان را به‌طور کاذب افزایش می‌دهد. می‌توانیم این ویژگیِ شمارش‌ها را به‌سرعت با داده‌های شبیه‌سازی‌شده نشان دهیم (در اینجا، شمارش‌های پواسون با دامنه‌ای از پارامتر لاندا از 0.1 تا 100). انحراف معیار هر سطر (ژن‌ها) را در برابر میانگین ترسیم می‌کنیم:

```
lambda <- 10^seq(from = -1, to = 2, length = 1000)
cts <- matrix(rpois(1000*100, lambda), ncol = 100)
library("vsn")
meanSdPlot(cts, ranks = FALSE)
```

و برای شمارش‌های لگاریتم‌دگرگون‌شده:

```
log.cts.one <- log2(cts + 1)
meanSdPlot(log.cts.one, ranks = FALSE)
```

لگاریتم با یک شبه‌شمارش کوچک، تفاوت‌ها را زمانی تقویت می‌کند که ...
مقادیر نزدیک به صفر هستند. ژن‌های با <span dir="ltr">count</span> (شمارش) پایین و نسبت سیگنال به نویز کم، به‌شکل نامتناسبی بر فاصله‌های نمونه-به-نمونه و نمودارهای <span dir="ltr">PCA</span> اثر می‌گذارند.

به‌عنوان راه‌حل، _<span dir="ltr">DESeq2_</span> دو تبدیل برای داده‌های شمارش ارائه می‌کند که واریانس را در سراسر میانگین پایدار می‌کنند:
_<span dir="ltr">variance</span> <span dir="ltr">stabilizing</span> <span dir="ltr">transformation_</span> یا <span dir="ltr">VST</span> برای داده‌های دوجمله‌ای منفی با روند <span dir="ltr">dispersion</span> (پراکندگی)-میانگین (<span dir="ltr">Anders</span> <span dir="ltr">and</span> <span dir="ltr">Huber</span> 2010) که در تابع _<span dir="ltr">vst_</span> پیاده‌سازی شده است،
و _<span dir="ltr">regularized-logarithm</span> <span dir="ltr">transformation_</span> یا _<span dir="ltr">rlog_</span> (<span dir="ltr">Love</span>, <span dir="ltr">Huber</span>, <span dir="ltr">and</span> <span dir="ltr">Anders</span> 2014).

برای ژن‌های با شمارش‌های بالا، هر دو تبدیل <span dir="ltr">VST</span> و <span dir="ltr">rlog</span> نتیجه‌ای مشابه با تبدیل لگاریتمی معمولِ پایهٔ 2 روی شمارش‌های نرمال‌شدهٔ حاصل از <span dir="ltr">normalization</span> (نرمال‌سازی) می‌دهند. اما برای ژن‌های با شمارش‌های پایین‌تر، مقادیر به‌سمت یک مقدار میانی جمع می‌شوند. داده‌های تبدیل‌شده با <span dir="ltr">VST</span> یا <span dir="ltr">rlog</span> به‌تقریب هم‌واریانس می‌شوند (روند تخت‌تر در _<span dir="ltr">meanSdPlot_</span>) و بنابراین می‌توان آن‌ها را مستقیماً برای محاسبهٔ فاصله‌ها بین نمونه‌ها، ساخت نمودارهای <span dir="ltr">PCA</span>، یا به‌عنوان ورودیِ روش‌های پایین‌دستی که با داده‌های هم‌واریانس بهترین کارکرد را دارند، به‌کار برد.

<span dir="ltr">Which</span> <span dir="ltr">transformation</span> <span dir="ltr">to</span> <span dir="ltr">choose</span>? انتخاب کدام تبدیل مناسب‌تر است؟ <span dir="ltr">VST</span> بسیار سریع‌تر محاسبه می‌شود و نسبت به پرت‌های دارای شمارش بالا حساسیت کمتری از <span dir="ltr">rlog</span> دارد. <span dir="ltr">rlog</span> معمولاً روی مجموعه‌داده‌های کوچک (<span dir="ltr">n</span> < 30) خوب عمل می‌کند و وقتی دامنهٔ عمق توالی‌گزینی بین نمونه‌ها بسیار گسترده باشد (اختلافی در حد یک مرتبهٔ بزرگی)، احتمال دارد از <span dir="ltr">VST</span> بهتر عمل کند. ازاین‌رو <span dir="ltr">VST</span> را برای مجموعه‌داده‌های متوسط تا بزرگ (<span dir="ltr">n</span> > 30) توصیه می‌کنیم. می‌توانید هر دو تبدیل را انجام دهید و __<span dir="ltr">KEEP_BIDI_00000__</span> یا نمودارهای <span dir="ltr">PCA</span> تولیدشده را مطابق توضیحات زیر مقایسه کنید.

توجه کنید که دو تبدیل ارائه‌شده توسط <span dir="ltr">DESeq2</span> برای کاربردهایی غیر از <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) در نظر گرفته شده‌اند. برای این تحلیل توصیه می‌کنیم از تابع _<span dir="ltr">DESeq_</span> روی شمارش‌های خام استفاده کنید، همان‌گونه که بعدتر در این جریان کار توضیح داده می‌شود؛ این روش در گام برآورد پراکندگی نیز وابستگی واریانسِ شمارش‌ها به مقدار میانگین را در نظر می‌گیرد.

هر دو تابع _<span dir="ltr">vst_</span> و _<span dir="ltr">rlog_</span> یک شیء از کلاس _<span dir="ltr">DESeqTransform_</span> برمی‌گردانند که بر پایهٔ کلاس _<span dir="ltr">SummarizedExperiment_</span> است. مقادیر تبدیل‌شده دیگر «شمارش» نیستند و در شکاف _<span dir="ltr">assay_</span> ذخیره می‌شوند. _<span dir="ltr">colData_</span>ای که به __<span dir="ltr">KEEP_BIDI_00000__</span> پیوست شده بود همچنان در دسترس است:

```
vsd <- vst(dds, blind = FALSE)
head(assay(vsd), 3)
```

```
##                    SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516
## ENSG00000000003.14  10.082167   9.828058  10.152774   9.970690  10.410407
## ENSG00000000419.12   9.663489   9.900634   9.779942   9.775148   9.740478
## ENSG00000000457.13   9.417376   9.280001   9.333639   9.430438   9.250501
##                    SRR1039517 SRR1039520 SRR1039521
## ENSG00000000003.14  10.171994  10.300682   9.976235
## ENSG00000000419.12   9.848458   9.659469   9.817695
## ENSG00000000457.13   9.363013   9.450889   9.444291
```

```
colData(vsd)
```

```
## DataFrame with 8 rows and 5 columns
##                 names    donor     condition     cell      dex
##              <factor> <factor>      <factor> <factor> <factor>
## SRR1039508 SRR1039508  N61311  Untreated      N61311     untrt
## SRR1039509 SRR1039509  N61311  Dexamethasone  N61311     trt  
## SRR1039512 SRR1039512  N052611 Untreated      N052611    untrt
## SRR1039513 SRR1039513  N052611 Dexamethasone  N052611    trt  
## SRR1039516 SRR1039516  N080611 Untreated      N080611    untrt
## SRR1039517 SRR1039517  N080611 Dexamethasone  N080611    trt  
## SRR1039520 SRR1039520  N061011 Untreated      N061011    untrt
## SRR1039521 SRR1039521  N061011 Dexamethasone  N061011    trt
```

و نیز برای _<span dir="ltr">rlog_:</span>

```
rld <- rlog(dds, blind = FALSE)
head(assay(rld), 3)
```

```
##                    SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516
## ENSG00000000003.14   9.479269   9.172988   9.561792   9.347935   9.853759
## ENSG00000000419.12   8.856681   9.150490   9.003390   8.997381   8.954032
## ENSG00000000457.13   8.352320   8.165586   8.239148   8.368679   8.122726
##                    SRR1039517 SRR1039520 SRR1039521
## ENSG00000000003.14   9.584201   9.730416   9.353458
## ENSG00000000419.12   9.088130   8.851863   9.049900
## ENSG00000000457.13   8.279323   8.396402   8.387635
```

در فراخوانی‌های تابعی بالا، __<span dir="ltr">KEEP_BIDI_00000__</span> را مشخص کردیم؛ یعنی تفاوت‌های بین رده‌های سلولی و تیمار (متغیرهای موجود در طرح آزمایش) در شکل‌گیری روند مورد انتظارِ واریانس-میانگینِ این آزمایش مشارکت نخواهند داشت. طرح آزمایشی مستقیماً در خودِ تبدیل به‌کار نمی‌رود، بلکه فقط برای برآورد میزان کلیِ تغییرپذیریِ موجود در شمارش‌ها استفاده می‌شود. برای یک تبدیل کاملاً بدون ناظر، می‌توان __<span dir="ltr">KEEP_BIDI_00001__</span> را تنظیم کرد (که پیش‌فرض نیز همین است).

برای نمایش اثر تبدیل، در شکل زیر نمونهٔ اول را در برابر نمونهٔ دوم رسم می‌کنیم: ابتدا با استفادهٔ ساده از تابع _<span dir="ltr">log2_</span> (پس از افزودن 1 برای پرهیز از گرفتن لگاریتمِ صفر)، و سپس با استفاده از مقادیر تبدیل‌شده با <span dir="ltr">VST</span> و <span dir="ltr">rlog.</span> برای رویکرد _<span dir="ltr">log2_</span> لازم است ابتدا ضریب‌های اندازه را برای درنظرگرفتن عمق توالی‌گزینی برآورد کنیم و سپس __<span dir="ltr">KEEP_BIDI_00000__</span> را مشخص کنیم. اصلاح عمق توالی‌گزینی برای _<span dir="ltr">vst_</span> و _<span dir="ltr">rlog_</span> به‌صورت خودکار انجام می‌شود.

```
library("dplyr")
library("ggplot2")

dds <- estimateSizeFactors(dds)

df <- bind_rows(
  as_data_frame(log2(counts(dds, normalized=TRUE)[, 1:2]+1)) %>%
         mutate(transformation = "log2(x + 1)"),
  as_data_frame(assay(vsd)[, 1:2]) %>% mutate(transformation = "vst"),
  as_data_frame(assay(rld)[, 1:2]) %>% mutate(transformation = "rlog"))
  
colnames(df)[1:2] <- c("x", "y")  

lvls <- c("log2(x + 1)", "vst", "rlog")
df$transformation <- factor(df$transformation, levels=lvls)

ggplot(df, aes(x = x, y = y)) + geom_hex(bins = 80) +
  coord_fixed() + facet_grid( . ~ transformation)
```

<span dir="ltr">Scatterplot</span> <span dir="ltr">of</span> <span dir="ltr">transformed</span> <span dir="ltr">counts</span> <span dir="ltr">from</span> <span dir="ltr">two</span> <span dir="ltr">samples.</span> نمودار پراکنشِ شمارش‌های تبدیل‌شده از دو نمونه. نمودارهای پراکنش با تبدیل لگاریتمی پایهٔ 2 روی شمارش‌های نرمال‌شده (چپ)، با <span dir="ltr">VST</span> (میانه)، و با <span dir="ltr">rlog</span> (راست) نشان داده شده‌اند. در حالی‌که <span dir="ltr">rlog</span> تقریباً روی همان مقیاسِ شمارش‌های لگاریتمی پایهٔ 2 است، <span dir="ltr">VST</span> برای مقادیر کوچک‌تر یک جابه‌جایی رو به بالا دارد. این تفاوت‌ها بین نمونه‌هاست (انحراف از <span dir="ltr">y</span>=<span dir="ltr">x</span> در این نمودارهای پراکنش) که به محاسبات فاصله و نمودار <span dir="ltr">PCA</span> سهم می‌افزایند.

می‌بینیم ژن‌هایی با شمارش‌های پایین (گوشهٔ پایین-چپ) روی مقیاس لگاریتمی معمول بیش‌ازحد متغیر به‌نظر می‌رسند، حال آن‌که <span dir="ltr">VST</span> و <span dir="ltr">rlog</span> اختلاف‌ها را برای ژن‌های کم‌شمارشی که داده‌ها دربارهٔ بیان تفاضلی آن‌ها اطلاعات اندکی فراهم می‌کنند، فشرده می‌سازند.

## ۴٫۳ فاصلهٔ نمونه‌ها

یک گام آغازینِ مفید در تحلیل <span dir="ltr">RNA-seq</span> اغلب ارزیابی شباهت کلی بین نمونه‌هاست: کدام نمونه‌ها به‌هم شبیه‌اند و کدام متفاوت؟ آیا این با انتظار برآمده از طرح آزمایش سازگار است؟

از تابع <span dir="ltr">R</span> به‌نام _<span dir="ltr">dist_</span> برای محاسبهٔ فاصلهٔ اقلیدسی بین نمونه‌ها استفاده می‌کنیم. برای اطمینان از مشارکت تقریباً یکنواختِ همهٔ ژن‌ها، این تابع را بر داده‌های <span dir="ltr">VST</span> به‌کار می‌بریم. باید ماتریس مقادیر را با _<span dir="ltr">t_</span> ترانهاده کنیم، زیرا تابع _<span dir="ltr">dist_</span> انتظار دارد نمونه‌های مختلف سطرهای آرگومان آن باشند و ابعاد مختلف (اینجا ژن‌ها) در ستون‌ها قرار گیرند.

```
sampleDists <- dist(t(assay(vsd)))
sampleDists
```

```
##            SRR1039508 SRR1039509 SRR1039512 SRR1039513 SRR1039516 SRR1039517
## SRR1039509   37.77776                                                       
## SRR1039512   30.25948   43.38127                                            
## SRR1039513   49.66501   34.84097   40.18573                                 
## SRR1039516   33.62914   46.11028   32.89674   50.61885                      
## SRR1039517   50.13559   39.95782   45.59332   38.73688   38.49412           
## SRR1039520   29.92878   45.27463   27.72834   46.25456   34.97574   48.96752
## SRR1039521   50.08387   35.35988   45.51074   28.48458   51.19216   39.62934
##            SRR1039520
## SRR1039509           
## SRR1039512           
## SRR1039513           
## SRR1039516           
## SRR1039517           
## SRR1039520           
## SRR1039521   41.45015
```

فاصله‌ها را در شکل زیر به‌صورت نقشهٔ گرمایی ترسیم می‌کنیم، با استفاده از تابع _<span dir="ltr">pheatmap_</span> از بستهٔ _[<span dir="ltr">pheatmap](https://cran.r-project.org/package=pheatmap)_.</span>

```
library("pheatmap")
library("RColorBrewer")
```

برای ترسیم ماتریس فاصلهٔ نمونه‌ها با آرایش ردیف‌ها/ستون‌ها بر پایهٔ فاصله‌های همین ماتریس، __<span dir="ltr">KEEP_BIDI_00000__</span> را به آرگومان __<span dir="ltr">KEEP_BIDI_00001__</span> در تابع _<span dir="ltr">pheatmap_</span> به‌صورت دستی می‌دهیم. در غیر این‌صورت، تابع _<span dir="ltr">pheatmap_</span> فرض می‌کند ماتریس شامل خودِ مقادیر داده است و فاصله‌ها را بین ردیف‌ها/ستون‌های ماتریسِ فاصله دوباره محاسبه می‌کند، که مطلوب ما نیست. همچنین یک پالت رنگیِ آبی را به‌صورت دستی با تابع _<span dir="ltr">colorRampPalette_</span> از بستهٔ _[<span dir="ltr">RColorBrewer](https://cran.r-project.org/package=RColorBrewer)_</span> مشخص می‌کنیم.

```
sampleDistMatrix <- as.matrix( sampleDists )
rownames(sampleDistMatrix) <- paste( vsd$dex, vsd$cell, sep = " - " )
colnames(sampleDistMatrix) <- NULL
colors <- colorRampPalette( rev(brewer.pal(9, "Blues")) )(255)
pheatmap(sampleDistMatrix,
         clustering_distance_rows = sampleDists,
         clustering_distance_cols = sampleDists,
         col = colors)
```

<span dir="ltr">Heatmap</span> <span dir="ltr">of</span> <span dir="ltr">sample-to-sample</span> <span dir="ltr">distances</span> <span dir="ltr">using</span> <span dir="ltr">the</span> <span dir="ltr">variance</span> <span dir="ltr">stabilizing</span> <span dir="ltr">transformed</span> <span dir="ltr">values.</span> نقشهٔ گرماییِ فاصله‌های نمونه-به-نمونه با استفاده از مقادیر تبدیل‌شدهٔ پایدارکنندهٔ واریانس.

توجه کنید که نام سطرهای ماتریس فاصله را تغییر دادیم تا به‌جای شناسهٔ نمونه، نوع تیمار و شمارهٔ بیمار را شامل شود؛ تا هنگام مشاهدهٔ نقشهٔ گرمایی، همهٔ این اطلاعات در دسترس دید باشد.

گزینهٔ دیگری برای محاسبهٔ فاصله‌های نمونه‌ها استفاده از <span dir="ltr">Poisson</span> <span dir="ltr">Distance</span> (<span dir="ltr">Witten</span> 2011) است که در بستهٔ _[<span dir="ltr">PoiClaClu](https://cran.r-project.org/package=PoiClaClu)_</span> پیاده‌سازی شده است. این معیارِ عدم شباهت بین شمارش‌ها، هنگام محاسبهٔ فاصله‌ها بین نمونه‌ها، ساختار واریانس ذاتیِ شمارش‌ها را نیز در نظر می‌گیرد. تابع _<span dir="ltr">PoissonDistance_</span> ماتریس شمارشِ اصلی (نرنمال‌شده) را می‌پذیرد با این تفاوت که نمونه‌ها باید به‌جای ستون‌ها، سطرها باشند؛ بنابراین باید شمارش‌ها را در __<span dir="ltr">KEEP_BIDI_00001__</span> ترانهاده کنیم.

```
library("PoiClaClu")
poisd <- PoissonDistance(t(counts(dds)))
```

نقشهٔ گرمایی را در شکل زیر ترسیم می‌کنیم.

```
samplePoisDistMatrix <- as.matrix( poisd$dd )
rownames(samplePoisDistMatrix) <- paste( dds$dex, dds$cell, sep=" - " )
colnames(samplePoisDistMatrix) <- NULL
pheatmap(samplePoisDistMatrix,
         clustering_distance_rows = poisd$dd,
         clustering_distance_cols = poisd$dd,
         col = colors)
```

<span dir="ltr">Heatmap</span> <span dir="ltr">of</span> <span dir="ltr">sample-to-sample</span> <span dir="ltr">distances</span> <span dir="ltr">using</span> <span dir="ltr">the</span> _<span dir="ltr">Poisson</span> <span dir="ltr">Distance_.</span> نقشهٔ گرماییِ فاصله‌های نمونه-به-نمونه با استفاده از _<span dir="ltr">Poisson</span> <span dir="ltr">Distance_.</span>

## ۴٫۴ نمودار <span dir="ltr">PCA</span>

راه دیگر برای نمایش فاصله‌های نمونه-به-نمونه، تحلیل مؤلفه‌های اصلی (<span dir="ltr">PCA</span>) است. در این روش، نقاط داده (اینجا نمونه‌ها) روی صفحهٔ دوبعدی افکنده می‌شوند به‌طوری‌که در دو جهتی که بیشترین مقدارِ توضیحِ واریانس را دارند، بیشترین پراکنش را بیابند.
تفاوت‌ها (شکل زیر). محور <span dir="ltr">x</span> جهت تفکیک‌کننده‌ای است که بیشترین جدایی میان نقاط داده را فراهم می‌کند. مقادیر نمونه‌ها در این جهت با _<span dir="ltr">PC1_</span> نشان داده می‌شوند. محور <span dir="ltr">y</span> جهت دیگری است (که باید نسبت به جهت اول _<span dir="ltr">orthogonal_</span> باشد) که دومین بیشترین جدایی را ایجاد می‌کند. مقادیر نمونه‌ها در این جهت با _<span dir="ltr">PC2_</span> نمایش داده می‌شوند. درصد واریانس کل که در هر جهت قرار دارد در برچسب محور نوشته شده است. توجه کنید که این درصدها با هم جمع‌شونده به 100٪ نمی‌شوند، چون ابعاد دیگری هم وجود دارند که واریانس باقی‌مانده را در خود دارند (گرچه هر یک از این ابعاد باقیمانده کمتر از دو بعدی خواهند بود که می‌بینیم).

```
plotPCA(vsd, intgroup = c("dex", "cell"))
```

**<span dir="ltr">PCA</span> <span dir="ltr">plot</span> <span dir="ltr">using</span> <span dir="ltr">the</span> <span dir="ltr">VST</span> <span dir="ltr">data.</span>** به هر ترکیب منحصربه‌فرد از درمان و ردهٔ سلولی رنگ متفاوتی اختصاص داده شده است.

در اینجا از تابع _<span dir="ltr">plotPCA_</span> که همراه با _<span dir="ltr">DESeq2_</span> ارائه می‌شود استفاده کرده‌ایم. دو عبارتی که توسط __<span dir="ltr">KEEP_BIDI_00000__</span> مشخص شده‌اند، گروه‌های مورد نظر برای برچسب‌گذاری نمونه‌ها هستند؛ این عبارات به تابع می‌گویند که از آن‌ها برای انتخاب رنگ‌ها استفاده کند. همچنین می‌توانیم نمودار <span dir="ltr">PCA</span> را از ابتدا با استفاده از بستهٔ _[<span dir="ltr">ggplot2](https://cran.r-project.org/package=ggplot2)_</span> بسازیم (<span dir="ltr">Wickham</span> 2009). برای این کار، از تابع _<span dir="ltr">plotPCA_</span> می‌خواهیم که به‌جای ساختن نمودار، داده‌های مورد استفاده برای رسم را برگرداند. برای جزئیات بیشتر دربارهٔ استفاده از _<span dir="ltr">ggplot_</span> به مستندات _<span dir="ltr">ggplot2_</span> مراجعه کنید: <span dir="ltr">http://docs.ggplot2.org/current/.</span>

```
pcaData <- plotPCA(vsd, intgroup = c( "dex", "cell"), returnData = TRUE)
pcaData
```

```
##                   PC1       PC2         group       name      names   donor
## SRR1039508 -14.427794 -3.057906  untrt:N61311 SRR1039508 SRR1039508  N61311
## SRR1039509   8.144808 -1.422929    trt:N61311 SRR1039509 SRR1039509  N61311
## SRR1039512  -9.476223 -4.414224 untrt:N052611 SRR1039512 SRR1039512 N052611
## SRR1039513  14.628644 -4.290437   trt:N052611 SRR1039513 SRR1039513 N052611
## SRR1039516 -12.425251 11.397272 untrt:N080611 SRR1039516 SRR1039516 N080611
## SRR1039517   9.475669 15.097249   trt:N080611 SRR1039517 SRR1039517 N080611
## SRR1039520 -10.965862 -7.197057 untrt:N061011 SRR1039520 SRR1039520 N061011
## SRR1039521  15.046009 -6.111969   trt:N061011 SRR1039521 SRR1039521 N061011
##                condition    cell   dex
## SRR1039508     Untreated  N61311 untrt
## SRR1039509 Dexamethasone  N61311   trt
## SRR1039512     Untreated N052611 untrt
## SRR1039513 Dexamethasone N052611   trt
## SRR1039516     Untreated N080611 untrt
## SRR1039517 Dexamethasone N080611   trt
## SRR1039520     Untreated N061011 untrt
## SRR1039521 Dexamethasone N061011   trt
```

```
percentVar <- round(100 * attr(pcaData, "percentVar"))
```

سپس می‌توانیم از این داده‌ها برای ساختن یک نمودار دوم در شکل زیر استفاده کنیم، طوری که رنگ نقاط نشان‌دهندهٔ درمان با دگزامتازون و شکل نمادها نشان‌دهندهٔ ردهٔ سلولی باشد.

```
ggplot(pcaData, aes(x = PC1, y = PC2, color = dex, shape = cell)) +
  geom_point(size =3) +
  xlab(paste0("PC1: ", percentVar[1], "% variance")) +
  ylab(paste0("PC2: ", percentVar[2], "% variance")) +
  coord_fixed() +
  ggtitle("PCA with VST data")
```

**<span dir="ltr">PCA</span> <span dir="ltr">plot</span> <span dir="ltr">using</span> <span dir="ltr">the</span> <span dir="ltr">VST</span> <span dir="ltr">values</span> <span dir="ltr">with</span> <span dir="ltr">custom</span> _<span dir="ltr">ggplot2_</span> <span dir="ltr">code.</span>** در اینجا ردهٔ سلولی (نماد رسم) و درمان با دگزامتازون (رنگ) مشخص شده‌اند.

از نمودار <span dir="ltr">PCA</span> می‌بینیم که اختلافات بین سلول‌ها (شکل‌های رسم متفاوت) چشمگیر هستند، اگرچه قدرتمندتر از اختلافات ناشی از درمان با دگزامتازون (قرمز در مقابل آبی) نیستند. این نشان می‌دهد که در آزمون‌های تفاضلی لازم است این موضوع را با طراحی زوجی (<span dir="ltr">paired</span>)، یعنی جفت‌کردن، در نظر بگیریم چون هر نمونهٔ درمان‌شده با دگزامتازون با یک نمونهٔ بدون درمان از همان ردهٔ سلولی «جفت» شده است. ما قبلاً برای این طراحی آماده شده‌ایم چون فرمول __<span dir="ltr">KEEP_BIDI_00000__</span> را قبلاً اختصاص داده‌ایم.

## ۴٫۵ نمودار <span dir="ltr">PCA</span> با استفاده از <span dir="ltr">PCA</span> تعمیم‌یافته

یک روش دیگر برای کاهش بعد در داده‌هایی که توزیع نرمال ندارند (مثلاً داده‌های شمارش که بیش‌پراکنش دارند) استفاده از <span dir="ltr">generalized</span> <span dir="ltr">principal</span> <span dir="ltr">component</span> <span dir="ltr">analysis</span> یا <span dir="ltr">GLM-PCA</span> است (<span dir="ltr">Townes</span> و همکاران، 2019) که در بستهٔ <span dir="ltr">CRAN</span> _[<span dir="ltr">glmpca](https://cran.r-project.org/package=glmpca)_</span> پیاده‌سازی شده است. این بسته ماتریس شمارش (<span dir="ltr">count</span> (شمارش)) را به‌عنوان ورودی می‌گیرد و همچنین تعداد ابعاد نهفته‌ای را که باید برازش شوند (در اینجا 2) می‌پذیرد. همان‌طور که <span dir="ltr">Townes</span> و همکاران (2019) بیان می‌کنند:

> …ما پیشنهاد می‌کنیم از <span dir="ltr">GLM-PCA</span> استفاده شود، که تعمیمی از
> <span dir="ltr">PCA</span> برای توزیع‌های خانوادهٔ نمایی است. <span dir="ltr">GLM-PCA</span> بر روی شمارش‌های خام عمل می‌کند
> و از مشکلات مربوط به نرمال‌سازی (<span dir="ltr">normalization</span> (نرمال‌سازی)) اجتناب می‌نماید. همچنین نشان می‌دهیم که به‌کارگیری <span dir="ltr">PCA</span>
> روی باقیمانده‌های <span dir="ltr">deviance</span> یا <span dir="ltr">Pearson</span> تقریب سودمند و سریعی از
> <span dir="ltr">GLM-PCA</span> ارائه می‌دهد.

```
library("glmpca")
gpca <- glmpca(counts(dds), L=2)
gpca.dat <- gpca$factors
gpca.dat$dex <- dds$dex
gpca.dat$cell <- dds$cell
```

```
ggplot(gpca.dat, aes(x = dim1, y = dim2, color = dex, shape = cell)) +
  geom_point(size =3) + coord_fixed() + ggtitle("glmpca - Generalized PCA")
```

## ۴٫۶ نمودار <span dir="ltr">MDS</span>

نمودار دیگری، بسیار شبیه به نمودار <span dir="ltr">PCA</span>، را می‌توان با استفاده از تابع _<span dir="ltr">multidimensional</span> <span dir="ltr">scaling_</span> (<span dir="ltr">MDS</span>) در <span dir="ltr">R</span> پایه ساخت. این روش زمانی مفید است که ماتریس داده در اختیار نداریم و تنها یک ماتریس فواصل داریم. در اینجا ما <span dir="ltr">MDS</span> را برای فواصل محاسبه‌شده از داده‌های _<span dir="ltr">VST_</span> محاسبه می‌کنیم و آن‌ها را در شکل زیر رسم می‌کنیم.

```
mds <- as.data.frame(colData(vsd))  %>%
         cbind(cmdscale(sampleDistMatrix))
ggplot(mds, aes(x = `1`, y = `2`, color = dex, shape = cell)) +
  geom_point(size = 3) + coord_fixed() + ggtitle("MDS with VST data")
```

**<span dir="ltr">MDS</span> <span dir="ltr">plot</span> <span dir="ltr">using</span> <span dir="ltr">VST</span> <span dir="ltr">data.</span>**

در شکل زیر همان نمودار را برای _<span dir="ltr">PoissonDistance_</span> نشان داده‌ایم:

```
mdsPois <- as.data.frame(colData(dds)) %>%
   cbind(cmdscale(samplePoisDistMatrix))
ggplot(mdsPois, aes(x = `1`, y = `2`, color = dex, shape = cell)) +
  geom_point(size = 3) + coord_fixed() + ggtitle("MDS with PoissonDistances")
```

**<span dir="ltr">MDS</span> <span dir="ltr">plot</span> <span dir="ltr">using</span> <span dir="ltr">the</span> _<span dir="ltr">Poisson</span> <span dir="ltr">Distance_</span> .**

# ۵ <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی)

## ۵٫۱ اجرای خط لولهٔ تحلیل بیان تفاضلی

چون هنگام ساخت _<span dir="ltr">DESeqDataSet_</span> طراحی تجربی را تعیین کرده‌ایم، می‌توانیم خط لولهٔ تحلیل بیان تفاضلی را روی شمارش‌های خام با یک فراخوانی به تابع _<span dir="ltr">DESeq_</span> اجرا کنیم:

```
dds <- DESeq(dds)
```

این تابع در هر مرحله پیام‌هایی دربارهٔ عملیات انجام‌شده چاپ می‌کند. این مراحل در صفحهٔ راهنمای تابع _<span dir="ltr">DESeq_</span> که با تایپ __<span dir="ltr">KEEP_BIDI_00000__</span> قابل دسترسی است، مفصل‌تر شرح داده شده‌اند. به‌طور خلاصه، این مراحل عبارت‌اند از: برآورد <span dir="ltr">size</span> <span dir="ltr">factors</span> (کنترل اختلاف در عمق توالی‌یابی نمونه‌ها)، برآورد مقدارهای <span dir="ltr">dispersion</span> (پراکندگی) برای هر <span dir="ltr">gene</span> (ژن)، و برازش یک مدل خطی تعمیم‌یافته.

یک _<span dir="ltr">DESeqDataSet_</span> بازگردانده می‌شود که شامل همهٔ پارامترهای برازش‌یافته در خود است، و بخش بعدی شرح می‌دهد چگونه جداول نتایج مورد علاقه را از این شی استخراج کنیم.

## ۵٫۲ ساخت جدول نتایج

فراخوانی _<span dir="ltr">results_</span> بدون هیچ آرگومانی، برآوردهای <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> و مقادیر <span dir="ltr">p</span> را برای آخرین متغیر در فرمول طراحی استخراج می‌کند. اگر برای این متغیر بیش از دو سطح وجود داشته باشد، _<span dir="ltr">results_</span> جدول نتایج مقایسهٔ سطح آخر نسبت به سطح اول را استخراج خواهد کرد. مقایسه در بالای خروجی چاپ می‌شود: __<span dir="ltr">KEEP_BIDI_00000__</span> .

```
res <- results(dds)
res
```

```
## log2 fold change (MLE): dex trt vs untrt 
## Wald test p-value: dex trt vs untrt 
## DataFrame with 16637 rows and 6 columns
##                     baseMean log2FoldChange     lfcSE      stat      pvalue
##                    <numeric>      <numeric> <numeric> <numeric>   <numeric>
## ENSG00000000003.14  740.1093      -0.365327 0.1073385 -3.403501 6.65282e-04
## ENSG00000000419.12  511.6990       0.202232 0.1278579  1.581694 1.13720e-01
## ENSG00000000457.13  314.1680       0.033792 0.1552106  0.217717 8.27650e-01
## ENSG00000000460.16   79.7988      -0.120633 0.3055270 -0.394836 6.92964e-01
## ENSG00000000971.15 5715.3064       0.442982 0.0904089  4.899766 9.59508e-07
## ...                      ...            ...       ...       ...         ...
## ENSG00000285953.1    29.5747      -1.920562  0.649661 -2.956253  0.00311401
## ENSG00000285967.1   181.1650      -0.325885  0.179340 -1.817132  0.06919688
## ENSG00000285976.1   875.4424       0.262132  0.142980  1.833351  0.06675037
## ENSG00000285979.1    38.3502       0.338383  0.348445  0.971124  0.33148631
## ENSG00000285991.1    11.2772      -0.115472  0.723139 -0.159681  0.87313221
##                           padj
##                      <numeric>
## ENSG00000000003.14 4.63552e-03
## ENSG00000000419.12 2.88125e-01
## ENSG00000000457.13 9.21718e-01
## ENSG00000000460.16 8.48743e-01
## ENSG00000000971.15 1.36387e-05
## ...                        ...
## ENSG00000285953.1    0.0171889
## ENSG00000285967.1    0.2019448
## ENSG00000285976.1    0.1965808
## ENSG00000285979.1    0.5713913
## ENSG00000285991.1           NA
```

ما می‌توانستیم همین جدول نتایج را با فرمان مشخص‌تری نیز تولید کنیم. چون __<span dir="ltr">KEEP_BIDI_00000__</span> آخرین متغیر در طراحی است، می‌توانیم به‌طور اختیاری آرگومان __<span dir="ltr">KEEP_BIDI_00001__</span> را حذف کنیم تا مقایسهٔ دو سطح __<span dir="ltr">KEEP_BIDI_00002__</span> را استخراج نماییم.

```
res <- results(dds, contrast=c("dex","trt","untrt"))
```

چون __<span dir="ltr">KEEP_BIDI_00000__</span> یک شیء _<span dir="ltr">DataFrame_</span> است، متادیتایی را که معنی ستون‌ها را توضیح می‌دهد همراه دارد:

```
mcols(res, use.names = TRUE)
```

```
## DataFrame with 6 rows and 2 columns
##                        type            description
##                 <character>            <character>
## baseMean       intermediate mean of normalized c..
## log2FoldChange      results log2 fold change (ML..
## lfcSE               results standard error: dex ..
## stat                results Wald statistic: dex ..
## pvalue              results Wald test p-value: d..
## padj                results   BH adjusted p-values
```

ستون اول، __<span dir="ltr">KEEP_BIDI_00000__</span>، صرفاً میانگین مقادیر شمارش نرمال‌شده (<span dir="ltr">normalized</span> <span dir="ltr">count</span> (شمارش) <span dir="ltr">values</span>)، تقسیم بر <span dir="ltr">size</span> <span dir="ltr">factors</span>، گرفته‌شده بر روی تمام نمونه‌ها در _<span dir="ltr">DESeqDataSet_</span> است. چهار ستون باقیمانده به یک <span dir="ltr">contrast</span> (مقایسه) مشخص اشاره دارند، یعنی مقایسهٔ سطح __<span dir="ltr">KEEP_BIDI_00001__</span> نسبت به سطح __<span dir="ltr">KEEP_BIDI_00002__</span> برای متغیر فاکتوری __<span dir="ltr">KEEP_BIDI_00003__.</span> در بخش‌های بعدی خواهیم دید چگونه مقایسه‌های دیگر را به‌دست آوریم.

ستون __<span dir="ltr">KEEP_BIDI_00000__</span> برآورد اندازهٔ اثر است. این ستون نشان می‌دهد که بیان ژن (<span dir="ltr">gene</span> (ژن)) تا چه حد به‌نظر می‌رسد بر اثر درمان با دگزامتازون نسبت به نمونه‌های بدون درمان تغییر کرده است. این مقدار روی مقیاس لگاریتمی پایهٔ 2 گزارش می‌شود: برای مثال، یک <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> برابر 1.5 یعنی بیان ژن حدوداً به‌مقدار ضریب 2^{1.5} ≈ 2.82 افزایش یافته است.

بدیهی است که این برآورد با عدم‌قطعیتی همراه است، که در ستون __<span dir="ltr">KEEP_BIDI_00000__</span> در دسترس است؛ این ستون برآورد خطای استاندارد برای برآورد <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> را نشان می‌دهد. همچنین می‌توان عدم‌قطعیت یک برآورد اندازهٔ اثر را به‌صورت نتیجهٔ یک آزمون آماری بیان کرد. هدف از یک آزمون برای تحلیل بیان تفاضلی (تحلیل بیان تفاضلی) این است که بررسی کند آیا داده‌ها شواهد کافی برای نتیجه‌گیری دربارهٔ اینکه این ...
مقدار واقعاً از صفر متفاوت است. _<span dir="ltr">DESeq2_</span> برای هر <span dir="ltr">gene</span> (ژن) یک آزمون فرضیه انجام می‌دهد تا بررسی کند آیا شواهد برای رد <span dir="ltr">null</span> <span dir="ltr">hypothesis</span> (فرض صفر) — که می‌گوید درمان بر <span dir="ltr">gene</span> (ژن) تأثیری ندارد — کافی هست یا خیر؛ در غیر این صورت تفاوت مشاهده‌شده بین گروه درمان و کنترل صرفاً ناشی از تغییرات تجربی است (یعنی همان نوع نوسانی که بین نمونه‌های مختلف در یک گروه درمانی انتظار می‌رود). همان‌طور که در آمار معمول است، نتیجهٔ این آزمون به‌صورت یک <span dir="ltr">p</span> <span dir="ltr">value</span> گزارش می‌شود و در ستون __<span dir="ltr">KEEP_BIDI_00000__</span> قرار دارد. به‌خاطر داشته باشید که <span dir="ltr">p</span> <span dir="ltr">value</span> نشان‌دهندهٔ احتمال مشاهدهٔ تغییر توانی (<span dir="ltr">fold</span> <span dir="ltr">change</span>)‌ای به‌اندازهٔ مقدار مشاهده‌شده یا قوی‌تر، تحت مفروضات فرض صفر است.

می‌توانیم نتایج را همچنین با خط کد زیر خلاصه کنیم؛ این خط اطلاعات اضافی‌ای گزارش می‌دهد که در بخش‌های بعد پوشش داده خواهد شد.

```
summary(res)
```

```
## 
## out of 16637 with nonzero total read count
## adjusted p-value < 0.1
## LFC > 0 (up)       : 2362, 14%
## LFC < 0 (down)     : 2019, 12%
## outliers [1]       : 0, 0%
## low counts [2]     : 646, 3.9%
## (mean count < 12)
## [1] see 'cooksCutoff' argument of ?results
## [2] see 'independentFiltering' argument of ?results
```

توجه کنید که در سطح <span dir="ltr">false</span> <span dir="ltr">discovery</span> <span dir="ltr">rate</span> (نرخ کشف کاذب) برابر 10%، تعداد زیادی <span dir="ltr">gene</span> (ژن) نشان‌دهندهٔ <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) در پاسخ به درمان با دگزامتازون هستند. این نتیجه معقول است، زیرا سلول‌های ماهیچهٔ صاف راه‌های هوایی به گلوکوکورتیکوئیدها شناخته‌شده واکنش نشان می‌دهند. با این حال دو راه برای محدودتر کردن مجموعهٔ ژن‌های مورد نظر به‌عنوان قابل‌توجه وجود دارد:

* کاهش آستانهٔ نرخ کشف کاذب (آستانهٔ ستون __<span dir="ltr">KEEP_BIDI_00000__</span> در جدول نتایج)
* افزایش آستانهٔ <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> از 0 با استفاده از آرگومان __<span dir="ltr">KEEP_BIDI_00000__</span> در تابع _<span dir="ltr">results_</span>

اگر آستانهٔ نرخ کشف کاذب را پایین‌تر ببریم، باید این آستانه را به تابع __<span dir="ltr">KEEP_BIDI_00000__</span> اطلاع دهیم تا آن تابع بتواند از این آستانه در فرایند فیلترینگ مستقلِ بهینه‌اش استفاده کند:

```
res.05 <- results(dds, alpha = 0.05)
table(res.05$padj < 0.05)
```

```
## 
## FALSE  TRUE 
## 12712  3602
```

اگر بخواهیم آستانهٔ <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> را بالا ببریم تا فقط به ژن‌هایی توجه کنیم که تغییرات بزرگ‌تری در پاسخ به درمان نشان می‌دهند، کافی است مقداری را بر روی مقیاس <span dir="ltr">log2</span> تعیین کنیم. برای مثال با مشخص کردن __<span dir="ltr">KEEP_BIDI_00000__</span>، ما برای ژن‌هایی آزمون می‌کنیم که اثرات معناداری از درمان بر <span dir="ltr">gene</span> (ژن) <span dir="ltr">count</span> (شمارش) نشان می‌دهند که بیش از دو برابر شدن یا کمتر از نصف شدن هستند، زیرا \\(2^1 = 2\\).

```
resLFC1 <- results(dds, lfcThreshold=1)
table(resLFC1$padj < 0.1)
```

```
## 
## FALSE  TRUE 
## 16397   240
```

گاهی زیرمجموعه‌ای از <span dir="ltr">p</span> <span dir="ltr">values</span> در __<span dir="ltr">KEEP_BIDI_00000__</span> دارای مقدار __<span dir="ltr">KEEP_BIDI_00001__</span> («<span dir="ltr">not</span> <span dir="ltr">available</span>») خواهند بود. این روش _<span dir="ltr">DESeq_</span> برای گزارش این وضعیت است که تمام شمارش‌ها برای آن <span dir="ltr">gene</span> (ژن) صفر بوده‌اند و بنابراین هیچ آزمونی اعمال نشده است. علاوه بر این، <span dir="ltr">p</span> <span dir="ltr">values</span> ممکن است __<span dir="ltr">KEEP_BIDI_00002__</span> اختصاص یابند اگر یک ژن از تحلیل حذف شده باشد چون شامل یک مقدار بیرونی بسیار دور از سایر شمارش‌ها بوده است. برای اطلاعات بیشتر، بخش شناسایی مقادیر بیرونی در وینیِت _<span dir="ltr">DESeq2_</span> را ببینید.

اگر از نتایج یک بستهٔ آنالیز <span dir="ltr">R</span> در پژوهش منتشرشده استفاده می‌کنید، می‌توانید ارجاع مناسب نرم‌افزار را با تایپ __<span dir="ltr">KEEP_BIDI_00000__</span> بیابید؛ در آنجا باید نام بسته را به‌جای __<span dir="ltr">KEEP_BIDI_00001__</span> قرار دهید. ارجاع دادن به مقالات روش‌شناسی به حمایت و پاداش دادن به افرادی که وقت صرف توسعهٔ نرم‌افزار متن‌باز برای تحلیل داده‌های ژنومی کرده‌اند کمک می‌کند.

## ۵٫۳ مقایسه‌های دیگر

به‌طور کلی، نتایج مربوط به مقایسهٔ هر دو سطحِ یک متغیر را می‌توان با استفاده از آرگومان __<span dir="ltr">KEEP_BIDI_00000__</span> در تابع _<span dir="ltr">results_</span> استخراج کرد. کاربر باید سه مقدار را مشخص کند: نام متغیر، نام سطحِ صورت‌گر (صورت‌مقام) و نام سطحِ مخرج. در اینجا نتایج برای <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> یک خط سلولی نسبت به خط سلولی دیگر را استخراج می‌کنیم:

```
results(dds, contrast = c("cell", "N061011", "N61311"))
```

```
## log2 fold change (MLE): cell N061011 vs N61311 
## Wald test p-value: cell N061011 vs N61311 
## DataFrame with 16637 rows and 6 columns
##                     baseMean log2FoldChange     lfcSE      stat      pvalue
##                    <numeric>      <numeric> <numeric> <numeric>   <numeric>
## ENSG00000000003.14  740.1093      0.2725914  0.152831  1.783618 7.44857e-02
## ENSG00000000419.12  511.6990     -0.0707901  0.181681 -0.389640 6.96803e-01
## ENSG00000000457.13  314.1680      0.1816517  0.220300  0.824567 4.09618e-01
## ENSG00000000460.16   79.7988     -0.1180515  0.428104 -0.275754 7.82737e-01
## ENSG00000000971.15 5715.3064      0.8234461  0.128134  6.426459 1.30610e-10
## ...                      ...            ...       ...       ...         ...
## ENSG00000285953.1    29.5747      1.3094223  0.891768  1.468344   0.1420107
## ENSG00000285967.1   181.1650     -0.5347871  0.254739 -2.099355   0.0357856
## ENSG00000285976.1   875.4424     -0.0932084  0.202503 -0.460281   0.6453144
## ENSG00000285979.1    38.3502      0.0604501  0.496866  0.121663   0.9031662
## ENSG00000285991.1    11.2772     -0.8779643  1.010832 -0.868556   0.3850901
##                           padj
##                      <numeric>
## ENSG00000000003.14 3.72420e-01
## ENSG00000000419.12 9.34643e-01
## ENSG00000000457.13 8.04500e-01
## ENSG00000000460.16 9.57685e-01
## ENSG00000000971.15 1.61144e-08
## ...                        ...
## ENSG00000285953.1     0.517887
## ENSG00000285967.1     0.241459
## ENSG00000285976.1     0.916522
## ENSG00000285979.1     0.981312
## ENSG00000285991.1           NA
```

پس از اجرای _<span dir="ltr">DESeq_</span> یک بار، راه‌های اضافی‌ای برای ساخت جداول نتایج برای برخی مقایسه‌ها وجود دارد. اگر نتایج برای یک ترمِ تعامل (<span dir="ltr">interaction</span>) مورد نیاز باشد، باید از آرگومان __<span dir="ltr">KEEP_BIDI_00000__</span> در _<span dir="ltr">results_</span> استفاده کنید. برای جزئیات بیشتر به صفحهٔ راهنمای تابع _<span dir="ltr">results_</span> مراجعه کنید؛ بخش <span dir="ltr">Examples</span> در آن صفحه مثال‌های مرتبطی ارائه می‌دهد.

## ۵٫۴ <span dir="ltr">multiple</span> <span dir="ltr">testing</span> (آزمون‌های چندگانه)

در زیست‌شناسی با توان بالا، احتیاط می‌کنیم که از <span dir="ltr">p</span> <span dir="ltr">values</span> مستقیماً به‌عنوان شواهد علیه فرض صفر استفاده نکنیم و در عوض برای اصلاح <span dir="ltr">multiple</span> <span dir="ltr">testing</span> (آزمون‌های چندگانه) اقدام نماییم. اگر بخواهیم به‌سادگی <span dir="ltr">p</span> <span dir="ltr">values</span> را در آستانهٔ کمی، مثلاً 0.05، محدود کنیم چه اتفاقی می‌افتد؟ از بین 16637 <span dir="ltr">gene</span> (ژن) که آزمون برای آن‌ها قادر به گزارش <span dir="ltr">p</span> <span dir="ltr">value</span> بود، 5069 <span dir="ltr">gene</span> (ژن) دارای <span dir="ltr">p</span> <span dir="ltr">value</span> کمتر از 0.05 هستند:

```
sum(res$pvalue < 0.05, na.rm=TRUE)
```

```
## [1] 5069
```

```
sum(!is.na(res$pvalue))
```

```
## [1] 16637
```

اکنون فرض کنید برای لحظه‌ای که فرض صفر برای همهٔ ژن‌ها برقرار است، یعنی هیچ ژنی توسط درمان دگزامتازون تحت تأثیر قرار نگرفته است. آنگاه طبق تعریف <span dir="ltr">p</span> <span dir="ltr">value</span>، انتظار داریم تا 5% از ژن‌ها مقدار <span dir="ltr">p</span> پایین‌تر از 0.05 داشته باشند؛ این معادل 832 ژن است. اگر صرفاً فهرست ژن‌هایی را که <span dir="ltr">p</span> <span dir="ltr">value</span> آن‌ها کمتر از 0.05 است به‌عنوان دارای بیان تفاضلی در نظر بگیریم، این فهرست بنابراین انتظار می‌رود شامل تا 832 / 5069 = 16% نتایج مثبت کاذب باشد.

_<span dir="ltr">DESeq2_</span> از اصلاح بنجامینی-هوچبرگ (<span dir="ltr">Benjamini-Hochberg</span>, <span dir="ltr">BH</span>) که در تابع پایهٔ <span dir="ltr">R</span> به نام _<span dir="ltr">p.adjust_</span> پیاده‌سازی شده است استفاده می‌کند؛ به‌اختصار، این روش برای هر ژن یک <span dir="ltr">adjusted</span> <span dir="ltr">p-value</span> (مقدار <span dir="ltr">p</span> تعدیل‌شده) محاسبه می‌کند که به سوال زیر پاسخ می‌دهد: اگر همهٔ ژن‌هایی را که مقدار <span dir="ltr">p</span> تعدیل‌شدهٔ آن‌ها کمتر یا برابر آستانهٔ مقدار <span dir="ltr">p</span> تعدیل‌شدهٔ این ژن باشند را «معنادار» فرض کنیم، چه کسری از آن‌ها مثبت کاذب خواهند بود (<span dir="ltr">false</span> <span dir="ltr">discovery</span> <span dir="ltr">rate</span>) با محاسبه‌ای مشابه آنچه پیش‌تر توضیح داده شد؟ این مقادیر، که <span dir="ltr">BH-adjusted</span> <span dir="ltr">p</span> <span dir="ltr">values</span> نامیده می‌شوند، در ستون __<span dir="ltr">KEEP_BIDI_00000__</span> شیٔ __<span dir="ltr">KEEP_BIDI_00001__</span> قرار دارند.

نرخ کشف کاذب برای بسیاری از آزمایش‌های با توان بالا آمار مفیدی است، چون اغلب علاقه‌مند به گزارش یا تمرکز بر یک مجموعهٔ مشخص از ژن‌های جالب هستیم و می‌خواهیم یک کرانهٔ بالایی برای درصد نتایج مثبت کاذب در این مجموعه تعیین کنیم.

بنابراین، اگر یک کسر 10% نتایج مثبت کاذب قابل‌قبول بدانیم، می‌توانیم همهٔ ژن‌هایی را که مقدار <span dir="ltr">p</span> تعدیل‌شدهٔ آن‌ها کمتر از 10% = 0.1 است به‌عنوان معنادار در نظر بگیریم. تعداد این ژن‌ها چقدر است؟

```
sum(res$padj < 0.1, na.rm=TRUE)
```

```
## [1] 4381
```

جدول نتایج را به این ژن‌ها زیرمجموعه‌گیری کرده و سپس بر اساس برآورد <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> مرتب می‌کنیم تا ژن‌های معنادار با شدتِ بیشترین کاهش بیان را به‌دست آوریم:

```
resSig <- subset(res, padj < 0.1)
head(resSig[ order(resSig$log2FoldChange), ])
```

```
## log2 fold change (MLE): dex trt vs untrt 
## Wald test p-value: dex trt vs untrt 
## DataFrame with 6 rows and 6 columns
##                     baseMean log2FoldChange     lfcSE      stat      pvalue
##                    <numeric>      <numeric> <numeric> <numeric>   <numeric>
## ENSG00000216490.3    42.3457       -5.72709  1.474282  -3.88466 1.02473e-04
## ENSG00000267339.5    30.5903       -5.39692  0.754323  -7.15465 8.38861e-13
## ENSG00000146006.7    61.6555       -4.48259  0.643341  -6.96767 3.22240e-12
## ENSG00000155897.9    23.9892       -3.87698  0.809195  -4.79115 1.65824e-06
## ENSG00000213240.8    12.1002       -3.79153  1.221385  -3.10429 1.90737e-03
## ENSG00000162692.11  505.5613       -3.67636  0.201427 -18.25164 2.00779e-74
##                           padj
##                      <numeric>
## ENSG00000216490.3  9.14426e-04
## ENSG00000267339.5  2.76013e-11
## ENSG00000146006.7  9.83385e-11
## ENSG00000155897.9  2.25676e-05
## ENSG00000213240.8  1.14064e-02
## ENSG00000162692.11 2.00666e-71
```

…و برای بیشترین افزایش بیان:

```
head(resSig[ order(resSig$log2FoldChange, decreasing = TRUE), ])
```

```
## log2 fold change (MLE): dex trt vs untrt 
## Wald test p-value: dex trt vs untrt 
## DataFrame with 6 rows and 6 columns
##                     baseMean log2FoldChange     lfcSE      stat      pvalue
##                    <numeric>      <numeric> <numeric> <numeric>   <numeric>
## ENSG00000254692.1    62.1517       10.20327  3.377058   3.02135 2.51651e-03
## ENSG00000179593.15   66.9666        9.50105  1.070620   8.87435 7.03444e-19
## ENSG00000224712.12   35.5516        7.16466  2.164701   3.30977 9.33725e-04
## ENSG00000109906.13  437.5025        6.37252  0.309988  20.55731 6.62052e-94
## ENSG00000257663.1    24.3615        6.34094  2.094868   3.02689 2.47081e-03
## ENSG00000250978.5    45.6682        5.91333  0.710469   8.32314 8.56661e-17
##                           padj
##                      <numeric>
## ENSG00000254692.1  1.44165e-02
## ENSG00000179593.15 4.22886e-17
## ENSG00000224712.12 6.18525e-03
## ENSG00000109906.13 1.17632e-90
## ENSG00000257663.1  1.42176e-02
## ENSG00000250978.5  4.32141e-15
```

# ۶ ترسیم نتایج

## ۶٫۱ نمودار شمارش‌ها

یک روش سریع برای دیدن شمارش‌ها برای یک <span dir="ltr">gene</span> (ژن) خاص استفاده از تابع _<span dir="ltr">plotCounts_</span> است که آرگومان‌های آن عبارت‌اند از یک _<span dir="ltr">DESeqDataSet_</span>، نام ژن و گروهی که بر اساس آن شمارش‌ها رسم خواهد شد (شکل زیر).

```
topGene <- rownames(res)[which.min(res$padj)]
plotCounts(dds, gene = topGene, intgroup=c("dex"))
```

**شمارش‌های نرمال‌شده برای یک ژن منفرد در گروه‌های درمان.**

همچنین می‌توانیم نمودارهای سفارشی با استفاده از تابع _<span dir="ltr">ggplot_</span> از بستهٔ _[<span dir="ltr">ggplot2](https://cran.r-project.org/package=ggplot2)_</span> بسازیم (اشکال زیر).

```
library("ggbeeswarm")
geneCounts <- plotCounts(dds, gene = topGene, intgroup = c("dex","cell"),
                         returnData = TRUE)
ggplot(geneCounts, aes(x = dex, y = count, color = cell)) +
  scale_y_log10() +  geom_beeswarm(cex = 3)
```

```
ggplot(geneCounts, aes(x = dex, y = count, color = cell, group = cell)) +
  scale_y_log10() + geom_point(size = 3) + geom_line()
```
**شمارش‌های <span dir="ltr">normalization</span> (نرمال‌سازی) شده با خطوطی که خطوط سلولی را به هم وصل می‌کنند.** توجه داشته باشید که آزمون _<span dir="ltr">DESeq_</span> در واقع اثر خط سلولی را در نظر می‌گیرد، بنابراین این شکل تصویر دقیق‌تری از اختلافی که مورد آزمایش است ارائه می‌دهد.

## ۶٫۲ نمودار <span dir="ltr">MA</span>

یک _نمودار <span dir="ltr">MA_</span> (<span dir="ltr">Dudoit</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2002) نمای کلی مفیدی از توزیع ضرایب برآوردشده در مدل، مانند مقایسه‌های موردِ علاقه، در میان همه <span dir="ltr">gene</span> (ژن) فراهم می‌آورد. در محور عمودی، «<span dir="ltr">M</span>» از «<span dir="ltr">minus</span>» گرفته شده — تفریق مقادیر لگاریتمی معادل لگاریتمِ نسبت است — و در محور افقی، «<span dir="ltr">A</span>» از «<span dir="ltr">average</span>» گرفته شده است. ممکن است این نمودار را همچنین به‌عنوان یک نمودار میانگین-تفاوت یا نمودار بلاند-آلتمن بشناسید.

پیش از رسم _نمودار <span dir="ltr">MA_</span>، از تابع _<span dir="ltr">lfcShrink_</span> برای کوچک‌سازی (<span dir="ltr">shrink</span>) تغییرات لگاریتمی دو‌برابر (<span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">changes</span>) در مقایسه نمونه‌های درمان‌شده با <span dir="ltr">dex</span> در برابر نمونه‌های درمان‌نشده استفاده می‌کنیم. در _<span dir="ltr">DESeq2_</span> سه نوع برآوردگر کوچک‌سازی وجود دارد که در [<span dir="ltr">DESeq2</span> <span dir="ltr">vignette](https://bioconductor.org/packages/release/bioc/vignettes/DESeq2/inst/doc/DESeq2.html)</span> پوشش داده شده‌اند. در اینجا روش _<span dir="ltr">apeglm_</span> را برای کوچک‌سازی ضرایب مشخص می‌کنیم، روشی که برای کاهش نویز برآوردهای <span dir="ltr">LFC</span> مناسب است و در عین حال برای اختلافات واقعی بزرگ برآوردهای با بایاس کم تولید می‌کند (<span dir="ltr">Zhu</span>, <span dir="ltr">Ibrahim</span>, <span dir="ltr">and</span> <span dir="ltr">Love</span> 2018). برای استفاده از _<span dir="ltr">apeglm_</span> باید یک ضریب از مدل را برای کوچک‌سازی مشخص کنیم، یا با نام یا با شماره‌ای که ضریب در __<span dir="ltr">KEEP_BIDI_00001__</span> ظاهر می‌شود.

```
library("apeglm")
resultsNames(dds)
```

```
## [1] "Intercept"               "cell_N061011_vs_N052611"
## [3] "cell_N080611_vs_N052611" "cell_N61311_vs_N052611" 
## [5] "dex_trt_vs_untrt"
```

```
res <- lfcShrink(dds, coef="dex_trt_vs_untrt", type="apeglm")
plotMA(res, ylim = c(-5, 5))
```

اگر لازم باشد که یک <span dir="ltr">contrast</span> (مقایسه) که در __<span dir="ltr">KEEP_BIDI_00000__</span> نشان داده نشده را مشخص کنیم، می‌توان از هر یک از دو روش کوچک‌سازی دیگر استفاده کرد، یا در برخی موارد بازتعریف متغیرهای مربوطه و اجرای __<span dir="ltr">KEEP_BIDI_00001__</span> و سپس __<span dir="ltr">KEEP_BIDI_00002__</span> کافی است. برای جزئیات بیشتر به <span dir="ltr">vignette</span> مربوط به <span dir="ltr">DESeq2</span> مراجعه کنید.

```
res.noshr <- results(dds, name="dex_trt_vs_untrt")
plotMA(res.noshr, ylim = c(-5, 5))
```

ما همچنین می‌توانیم نقاط منفرد را روی _نمودار <span dir="ltr">MA_</span> برچسب‌گذاری کنیم. در اینجا از تابع _<span dir="ltr">with_</span> در <span dir="ltr">R</span> برای رسم یک دایره و متن برای یک ردیف انتخاب‌شده از شیء نتایج استفاده می‌کنیم. درون تابع _<span dir="ltr">with_</span> تنها مقادیر __<span dir="ltr">KEEP_BIDI_00000__</span> و __<span dir="ltr">KEEP_BIDI_00001__</span> برای ردیف‌های انتخاب‌شده از __<span dir="ltr">KEEP_BIDI_00002__</span> به کار می‌روند.

```
plotMA(res, ylim = c(-5,5))
topGene <- rownames(res)[which.min(res$padj)]
with(res[topGene, ], {
  points(baseMean, log2FoldChange, col="dodgerblue", cex=2, lwd=2)
  text(baseMean, log2FoldChange, topGene, pos=2, col="dodgerblue")
})
```

یکی دیگر از نمودارهای تشخیصی مفید، هیستوگرام مقادیر _<span dir="ltr">p_</span> است (شکل زیر). این نمودار بهتر است با حذف ژن‌هایی که شمارش‌های بسیار کوچکی دارند ساخته شود، زیرا در غیر این صورت باعث ایجاد قله‌هایی در هیستوگرام می‌شوند.

```
hist(res$pvalue[res$baseMean > 1], breaks = 0:20/20,
     col = "grey50", border = "white")
```

**هیستوگرام مقادیر _<span dir="ltr">p_</span> برای ژن‌هایی که میانگین شمارش <span dir="ltr">normalization</span> (نرمال‌سازی) شده آن‌ها بزرگ‌تر از 1 است.**

## ۶٫۳ خوشه‌بندی ژن‌ها

در نقشه گرمایی فواصل نمونه که پیش‌تر ساخته شد، دندروگرام در کنار نشان‌دهنده خوشه‌بندی سلسله‌مراتبی نمونه‌هاست. چنین خوشه‌بندی‌ای را می‌توان برای ژن‌ها نیز انجام داد. از آنجا که خوشه‌بندی تنها برای ژن‌هایی معنی‌دار است که واقعاً سیگنال دارند، معمولاً تنها زیرمجموعه‌ای از پر‌تغییرترین ژن‌ها را خوشه‌بندی می‌کنند. برای نمایش، بیایید 20 ژنی را انتخاب کنیم که بیشترین واریانس را در میان نمونه‌ها دارند. برای این کار از داده‌های <span dir="ltr">VST</span> استفاده خواهیم کرد.

```
library("genefilter")
topVarGenes <- head(order(rowVars(assay(vsd)), decreasing = TRUE), 20)
```

نقشهٔ گرمایی زمانی جالب‌تر می‌شود که به جای قدر مطلقِ میزان بیان، به میزان انحراف هر ژن در یک نمونه خاص از میانگین آن ژن در تمام نمونه‌ها نگاه کنیم. بنابراین، مقادیر هر ژن را در میان نمونه‌ها مرکزی (<span dir="ltr">center</span>) می‌کنیم و یک نقشهٔ گرمایی رسم می‌کنیم (شکل زیر). ما یک _<span dir="ltr">data.frame_</span> فراهم می‌کنیم که به تابع _<span dir="ltr">pheatmap_</span> می‌گوید چگونه ستون‌ها را برچسب‌گذاری کند.

```
mat  <- assay(vsd)[ topVarGenes, ]
mat  <- mat - rowMeans(mat)
anno <- as.data.frame(colData(vsd)[, c("cell","dex")])
pheatmap(mat, annotation_col = anno)
```

**نقشهٔ گرماییِ مقادیر تبدیل‌شده توسط <span dir="ltr">VST</span> به صورت نسبی در میان نمونه‌ها.** وضعیت درمان و اطلاعات خط سلولی با میله‌های رنگی در بالای نقشهٔ گرمایی نشان داده شده‌اند. بلوک‌هایی از ژن‌ها که به صورت هم‌تغییر در بین بیماران ظاهر می‌شوند دیده می‌شوند. توجه داشته باشید که مجموعه‌ای از ژن‌ها در نقشهٔ گرمایی خط سلولی <span dir="ltr">N061011</span> را از بقیه جدا می‌کنند، و مجموعهٔ دیگری از ژن‌ها وجود دارد که در آن‌ها نمونه‌های درمان‌شده با دگزامتازون بیان ژن بالاتری دارند.

## ۶٫۴ پالایش مستقل

_<span dir="ltr">n</span> نمودار <span dir="ltr">MA</span> _ ویژگی مهمی از داده‌های <span dir="ltr">RNA-seq</span> را برجسته می‌کند. برای ژن‌هایی که ضعیف بیان می‌شوند، شانس دیدن <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) عملاً وجود ندارد، زیرا شمارش‌های کمِ <span dir="ltr">read</span> (خوانش) از نویز پواسونِ بسیار بالایی رنج می‌برند به‌طوری که هر اثر زیستی در عدم‌قطعیت‌های نمونه‌برداریِ با نرخ پایین غرق می‌شود. این موضوع را می‌توان با بررسی نسبت مقادیر _<span dir="ltr">p_</span> کوچک (مثلاً کمتر از 0.05) برای ژن‌هایی که بر اساس میانگین شمارش <span dir="ltr">normalization</span> (نرمال‌سازی) شده دسته‌بندی شده‌اند نیز نشان داد. ما از جدول نتایج مشروط به آستانه استفاده خواهیم کرد تا نشان دهیم این وضعیت چگونه وقتی تست‌های کمی با مقادیر _<span dir="ltr">p_</span> کوچک وجود دارد به نظر می‌رسد.

در قطعهٔ کد زیر، با استفاده از تابع _<span dir="ltr">quantile_</span> بین ایجاد می‌کنیم، ژن‌ها را بر اساس <span dir="ltr">base</span> <span dir="ltr">mean</span> با _<span dir="ltr">cut_</span> دسته‌بندی می‌کنیم، سطوح باین‌ها را با استفاده از نقطهٔ میانی نام‌گذاری مجدد می‌کنیم، نسبت مقادیر _<span dir="ltr">p_</span> کمتر از 0.05 را برای هر باین محاسبه می‌کنیم و در نهایت این نسبت‌ها را رسم می‌کنیم (شکل زیر).

```
qs <- c(0, quantile(resLFC1$baseMean[resLFC1$baseMean > 0], 0:6/6))
bins <- cut(resLFC1$baseMean, qs)
levels(bins) <- paste0("~", round(signif((qs[-1] + qs[-length(qs)])/2, 2)))
fractionSig <- tapply(resLFC1$pvalue, bins, function(p)
                          mean(p < .05, na.rm = TRUE))
barplot(fractionSig, xlab = "mean normalized count",
                     ylab = "fraction of small p values")
```

**نسبت مقادیر کوچک _<span dir="ltr">p_</span> برای ژن‌هایی که بر اساس میانگین شمارش <span dir="ltr">normalization</span> (نرمال‌سازی) شده دسته‌بندی شده‌اند.** مقادیر _<span dir="ltr">p_</span> حاصل از یک آزمون برای بررسی این است که <span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">change</span> بزرگ‌تر از 1 یا کمتر از -1 است. این نمودار نشان می‌دهد ژن‌هایی با میانگین شمارش بسیار کم قدرت آماری اندکی دارند یا عملاً هیچ قدرتی ندارند و بهتر است از آزمون حذف شوند.

در نگاه اول شاید حذف این ژن‌ها فایدهٔ کمی به‌نظر برسد؛ بالاخره آزمون آن‌ها را غیر‌معنادار تشخیص داده است. با این حال، این ژن‌ها بر روی تعدیل <span dir="ltr">multiple</span> <span dir="ltr">testing</span> (آزمون‌های چندگانه) تأثیر دارند و عملکرد این تعدیل با حذف چنین ژن‌هایی بهتر می‌شود. با حذف ژن‌های با شمارش کم از ورودی رویهٔ <span dir="ltr">false</span> <span dir="ltr">discovery</span> <span dir="ltr">rate</span> (نرخ کشف کاذب)، می‌توانیم ژن‌های بیشتری را در میان ژن‌های باقی‌مانده به‌عنوان معنادار بیابیم و در نتیجه قدرت آزمون‌مان افزایش یابد. این رویکرد به عنوان فیلترینگ مستقل شناخته می‌شود.

نرم‌افزار _<span dir="ltr">DESeq2_</span> به‌طور خودکار فیلترینگ مستقل را انجام می‌دهد تا تعداد ژن‌هایی با مقدار <span dir="ltr">p</span> تعدیل‌شده کمتر از یک مقدار بحرانی را بیشینه کند (به‌طور پیش‌فرض __<span dir="ltr">KEEP_BIDI_00000__</span> بر روی 0.1 تنظیم شده است). این فیلترینگ مستقل خودکار توسط تابع _<span dir="ltr">results_</span> انجام می‌شود و می‌توان آن را از طریق این تابع کنترل کرد.

اصطلاح _<span dir="ltr">independent_</span> یک نکتهٔ مهم را برجسته می‌کند. چنین فیلتری...
مجاز بودن این کار تنها زمانی برقرار است که آماری که براساس آن فیلتر انجام می‌دهیم (در اینجا میانگین <span dir="ltr">normalized</span> <span dir="ltr">count</span> (شمارش) نرمال‌شده در میان همهٔ نمونه‌ها) تحت فرض صفر مستقل از آمارهٔ آزمون واقعی (مقدار <span dir="ltr">p</span>) باشد. در غیر این صورت، فیلتر کردن آزمون را نامعتبر خواهد کرد و در نتیجه فروض روش <span dir="ltr">BH</span> نقض می‌شود. نرم‌افزار فیلترینگ مستقل که درون _<span dir="ltr">DESeq2_</span> استفاده شده از بستهٔ _[<span dir="ltr">genefilter](https://bioconductor.org/packages/3.23/genefilter)_</span> گرفته شده است، که مرجعی به مقاله‌ای دربارهٔ پایه‌های آماری فیلترینگ مستقل دارد (<span dir="ltr">Bourgon</span>, <span dir="ltr">Gentleman</span>, <span dir="ltr">and</span> <span dir="ltr">Huber</span> 2010).

## ۶٫۵ وزن‌دهی مستقل فرضیه‌ها

تعمیم کلی ایدهٔ فیلتر بر اساس مقدار <span dir="ltr">p</span> این است که به هر فرضیه وزن تخصیص دهیم تا توان آزمون بهینه شود. بسته‌ای در <span dir="ltr">Bioconductor</span> به نام _[<span dir="ltr">IHW](https://bioconductor.org/packages/3.23/IHW)_</span> روش _<span dir="ltr">Independent</span> <span dir="ltr">Hypothesis</span> <span dir="ltr">Weighting_</span> را پیاده‌سازی می‌کند (<span dir="ltr">Ignatiadis</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2016). برای نمونهٔ استفاده از _<span dir="ltr">IHW_</span> در کنار _<span dir="ltr">DESeq2_</span> به ویگنت بستهٔ _<span dir="ltr">DESeq2_</span> مراجعه کنید. به‌ویژه، قطعه‌کد زیر (که در اینجا اجرا نشده است) را می‌توان به‌جای فیلترینگ مستقل شرح‌داده‌شدهٔ بالا برای اجرای <span dir="ltr">IHW</span> به‌کار برد.

```
library("IHW")
res.ihw <- results(dds, filterFun=ihw)
```

# 7 حاشیه‌نویسی و صدور نتایج

جدول نتایج ما تا کنون تنها شامل شناسه‌های <span dir="ltr">Ensembl</span> <span dir="ltr">gene</span> (ژن) است، اما نام‌های جایگزین ژن ممکن است در تفسیر اطلاعات مفیدتر باشند. بسته‌های حاشیه‌نویسی در <span dir="ltr">Bioconductor</span> در نگاشتن طرح‌های مختلف شناسه به یکدیگر کمک می‌کنند. بستهٔ _[<span dir="ltr">AnnotationDbi](https://bioconductor.org/packages/3.23/AnnotationDbi)_</span> و بستهٔ حاشیه‌نویسی _[<span dir="ltr">org.Hs.eg.db](https://bioconductor.org/packages/3.23/org.Hs.eg.db)_</span> را بارگذاری می‌کنیم:

```
library("AnnotationDbi")
library("org.Hs.eg.db")
```

این بستهٔ حاشیه‌نویسیِ ارگانیسم (“<span dir="ltr">org</span>”) برای _<span dir="ltr">Homo</span> <span dir="ltr">sapiens_</span> (“<span dir="ltr">Hs</span>”) است که به‌صورت یک بستهٔ پایگاه‌دادهٔ _<span dir="ltr">AnnotationDbi_</span> (“<span dir="ltr">db</span>”) سازمان‌دهی شده و از <span dir="ltr">Entrez</span> <span dir="ltr">Gene</span> <span dir="ltr">IDs</span> (“<span dir="ltr">eg</span>”) به‌عنوان کلید اولیه استفاده می‌کند. برای گرفتن فهرستی از همهٔ نوع‌های کلید موجود، از دستور زیر استفاده کنید:

```
columns(org.Hs.eg.db)
```

```
##  [1] "ACCNUM"       "ALIAS"        "ENSEMBL"      "ENSEMBLPROT"  "ENSEMBLTRANS"
##  [6] "ENTREZID"     "ENZYME"       "EVIDENCE"     "EVIDENCEALL"  "GENENAME"    
## [11] "GENETYPE"     "GO"           "GOALL"        "IPI"          "MAP"         
## [16] "OMIM"         "ONTOLOGY"     "ONTOLOGYALL"  "PATH"         "PFAM"        
## [21] "PMID"         "PROSITE"      "REFSEQ"       "SYMBOL"       "UCSCKG"      
## [26] "UNIPROT"
```

می‌توانیم از تابع _<span dir="ltr">mapIds_</span> برای افزودن ستون‌های جداگانه به جدول نتایج استفاده کنیم. نام ردیف‌های جدول نتایج را به‌عنوان کلید می‌دهیم، و مشخص می‌کنیم که __<span dir="ltr">KEEP_BIDI_00000__</span> . آرگومان __<span dir="ltr">KEEP_BIDI_00001__</span> به تابع _<span dir="ltr">mapIds_</span> می‌گوید که چه اطلاعاتی را می‌خواهیم، و آرگومان __<span dir="ltr">KEEP_BIDI_00002__</span> تعیین می‌کند در صورت وجود چند مقدار مختلف برای یک مقدار ورودی چه باید کرد. در اینجا می‌خواهیم فقط اولین مقدار موجود در پایگاه‌داده بازگردانده شود. برای افزودن نماد ژن و شناسهٔ <span dir="ltr">Entrez</span>، دوبار _<span dir="ltr">mapIds_</span> را فراخوانی می‌کنیم.

```
ens.str <- substr(rownames(res), 1, 15)
res$symbol <- mapIds(org.Hs.eg.db,
                     keys=ens.str,
                     column="SYMBOL",
                     keytype="ENSEMBL",
                     multiVals="first")
res$entrez <- mapIds(org.Hs.eg.db,
                     keys=ens.str,
                     column="ENTREZID",
                     keytype="ENSEMBL",
                     multiVals="first")
```

اکنون نتایج شامل شناسه‌های خارجی ژن موردنظر است:

```
resOrdered <- res[order(res$pvalue),]
head(resOrdered)
```

```
## log2 fold change (MAP): dex trt vs untrt 
## Wald test p-value: dex trt vs untrt 
## DataFrame with 6 rows and 7 columns
##                     baseMean log2FoldChange     lfcSE       pvalue         padj
##                    <numeric>      <numeric> <numeric>    <numeric>    <numeric>
## ENSG00000189221.9   2371.265        3.38410  0.136340 2.47518e-138 3.95806e-134
## ENSG00000120129.5   3417.255        2.95871  0.121485 3.44226e-133 2.75226e-129
## ENSG00000101347.9  14106.720        3.73919  0.157542 1.66892e-127 8.89591e-124
## ENSG00000152583.12   973.479        4.48318  0.199191 2.26145e-115 9.04071e-112
## ENSG00000196136.17  2708.309        3.22904  0.144707 1.23286e-112 3.94293e-109
## ENSG00000211445.11 12502.886        3.75413  0.170078 2.52549e-111 6.73085e-108
##                         symbol      entrez
##                    <character> <character>
## ENSG00000189221.9         MAOA        4128
## ENSG00000120129.5        DUSP1        1843
## ENSG00000101347.9       SAMHD1       25939
## ENSG00000152583.12     SPARCL1        8404
## ENSG00000196136.17    SERPINA3          12
## ENSG00000211445.11        GPX3        2878
```

## ۷٫۱ خروجی‌گیری از نتایج

شما می‌توانید به‌سادگی جدول نتایج را در یک فایل <span dir="ltr">CSV</span> ذخیره کنید و سپس آن را به‌اشتراک بگذارید یا با یک برنامهٔ صفحه‌گسترده مانند <span dir="ltr">Excel</span> باز کنید. فراخوانی _<span dir="ltr">as.data.frame_</span> لازم است تا شیء _<span dir="ltr">DataFrame_</span> (بستهٔ _[<span dir="ltr">IRanges](https://bioconductor.org/packages/3.23/IRanges)_</span>) به یک شیء _<span dir="ltr">data.frame_</span> تبدیل شود که _<span dir="ltr">write.csv_</span> بتواند آن را پردازش کند. در این‌جا برای نمایش فقط 100 ژن برتر را برمی‌داریم.

```
resOrderedDF <- as.data.frame(resOrdered)[1:100, ]
write.csv(resOrderedDF, file = "results.csv")
```

روش‌های پیچیده‌تر برای صدور نتایج در ویگنت _<span dir="ltr">DESeq2_</span> شرح داده شده‌اند، که لینک‌هایی به سایر بسته‌های <span dir="ltr">Bioconductor</span> فراهم می‌کنند که تسهیل‌کنندهٔ مصورسازی و ساخت گزارش هستند.

## ۷٫۲ ترسیم تغییرات نسبت در فضای ژنومی

اگر از تابع _<span dir="ltr">tximeta_</span> برای خواندن داده‌های کمی‌سازی استفاده کرده باشیم، آنگاه شیء _<span dir="ltr">DESeqDataSet_</span> ما روی مجموعه‌ای از اشیاء آمادهٔ <span dir="ltr">Bioconductor</span> ساخته شده است که مختصات ژن‌ها را مشخص می‌کنند. بنابراین به‌راحتی می‌توانیم نتایج <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) را در فضای ژنومی رسم کنیم. در حالی که توابع _<span dir="ltr">results_</span> یا _<span dir="ltr">lfcShrink_</span> به‌صورت پیش‌فرض یک _<span dir="ltr">DataFrame_</span> بازمی‌گردانند، با استفاده از آرگومان __<span dir="ltr">KEEP_BIDI_00000__</span> می‌توانیم خروجی از نوع _<span dir="ltr">GRanges_</span> یا _<span dir="ltr">GRangesList_</span> درخواست کنیم (نوع دوم تنها در صورتی ممکن است که پیش از ایجاد _<span dir="ltr">DESeqDataSet_</span> از تابع _<span dir="ltr">addExons_</span> در بستهٔ _<span dir="ltr">tximeta_</span> استفاده کرده باشیم).

```
resGR <- lfcShrink(dds, coef="dex_trt_vs_untrt", type="apeglm", format="GRanges")
resGR
```

```
## GRanges object with 16637 ranges and 5 metadata columns:
##                      seqnames              ranges strand |  baseMean
##                         <Rle>           <IRanges>  <Rle> | <numeric>
##   ENSG00000000003.14     chrX 100627109-100639991      - |  740.1093
##   ENSG00000000419.12    chr20   50934867-50958555      - |  511.6990
##   ENSG00000000457.13     chr1 169849631-169894267      - |  314.1680
##   ENSG00000000460.16     chr1 169662007-169854080      + |   79.7988
##   ENSG00000000971.15     chr1 196651878-196747504      + | 5715.3064
##                  ...      ...                 ...    ... .       ...
##    ENSG00000285953.1     chr7   92131774-92245924      - |   29.5747
##    ENSG00000285967.1     chr5   36864425-36876700      - |  181.1650
##    ENSG00000285976.1     chr6   63572012-63583587      + |  875.4424
##    ENSG00000285979.1    chr16   57177349-57181390      + |   38.3502
##    ENSG00000285991.1     chr6 149817937-149896011      - |   11.2772
##                      log2FoldChange     lfcSE      pvalue        padj
##                           <numeric> <numeric>   <numeric>   <numeric>
##   ENSG00000000003.14     -0.3401220 0.1063304 6.65282e-04 4.63552e-03
##   ENSG00000000419.12      0.1770178 0.1218213 1.13720e-01 2.88125e-01
##   ENSG00000000457.13      0.0269533 0.1394669 8.27650e-01 9.21718e-01
##   ENSG00000000460.16     -0.0616870 0.2231260 6.92964e-01 8.48743e-01
##   ENSG00000000971.15      0.4206549 0.0903614 9.59508e-07 1.36387e-05
##                  ...            ...       ...         ...         ...
##    ENSG00000285953.1     -1.2313653  0.916996  0.00311401   0.0171889
##    ENSG00000285967.1     -0.2623422  0.169901  0.06919688   0.2019448
##    ENSG00000285976.1      0.2247352  0.136898  0.06675037   0.1965808
##    ENSG00000285979.1      0.1614980  0.257628  0.33148631   0.5713913
##    ENSG00000285991.1     -0.0168702  0.290081  0.87313221          NA
##   -------
##   seqinfo: 25 sequences (1 circular) from hg38 genome
```

برای برچسب‌زنی ژن‌ها روی نمودار لازم است دوباره نماد را اضافه کنیم:

```
ens.str <- substr(names(resGR), 1, 15)
resGR$symbol <- mapIds(org.Hs.eg.db, ens.str, "SYMBOL", "ENSEMBL")
```

برای رسمِ <span dir="ltr">GRanges</span> و متادیتای مرتبط — یعنی تغییرات لگاریتمیِ ضریب که ناشی از درمان با دگزامتازون هستند — از بستهٔ _[<span dir="ltr">Gviz](https://bioconductor.org/packages/3.23/Gviz)_</span> استفاده می‌کنیم.

```
library("Gviz")
```

قطعه‌کد زیر بازه‌ای به طول 1٬000٬000 جفت باز بالادست و پایین‌دست را نسبت به ژنی که کمترین مقدار <span dir="ltr">p</span> را دارد مشخص می‌کند. برای ژن‌های واقع در این پنجره زیرمجموعه‌ای از نتایج کامل ایجاد می‌کنیم. اگر نماد وجود داشته باشد و در زیرمجموعه تک‌رُدی باشد، آن را به‌عنوان نام اضافه می‌کنیم.

```
window <- resGR[topGene] + 1e6
strand(window) <- "*"
resGRsub <- resGR[resGR %over% window]
naOrDup <- is.na(resGRsub$symbol) | duplicated(resGRsub$symbol)
resGRsub$group <- ifelse(naOrDup, names(resGRsub), resGRsub$symbol)
```

برداری ایجاد می‌کنیم که مشخص کند آیا ژن‌های این زیرمجموعه مقدار کمی از __<span dir="ltr">KEEP_BIDI_00000__</span> داشته‌اند یا خیر.

```
status <- factor(ifelse(resGRsub$padj < 0.05 & !is.na(resGRsub$padj),
                        "sig", "notsig"))
```

سپس می‌توانیم نتایج را با توابع _[<span dir="ltr">Gviz](https://bioconductor.org/packages/3.23/Gviz)_</span> رسم کنیم (شکل زیر). یک «ردیف محور» برای مشخص کردن موقعیت در ژنوم می‌سازیم، یک ردیف که ژن‌ها و نام‌هایشان را نشان می‌دهد و بر اساس معنی‌داری رنگ‌آمیزی می‌شود، و یک ردیف داده که میله‌های عمودی را رسم می‌کند که تغییرات لگاریتمیِ تعدیلات‌شدهٔ ضریب تولیدشده توسط _<span dir="ltr">DESeq2_</span> را نشان می‌دهد؛ این مقادیر تنها زمانی بزرگ هستند که اثر به‌خوبی توسط اطلاعات موجود در شمارش‌ها پشتیبانی شده باشد.

```
options(ucscChromosomeNames = FALSE)
g <- GenomeAxisTrack()
a <- AnnotationTrack(resGRsub, name = "gene ranges", feature = status)
d <- DataTrack(resGRsub, data = "log2FoldChange", baseline = 0,
               type = "h", name = "log2 fold change", strand = "+")
plotTracks(list(g, d, a), groupAnnotation = "group",
           notsig = "grey", sig = "hotpink")
```

**<span dir="ltr">log2</span> <span dir="ltr">fold</span> <span dir="ltr">changes</span> <span dir="ltr">in</span> <span dir="ltr">genomic</span> <span dir="ltr">region</span> <span dir="ltr">surrounding</span> <span dir="ltr">the</span> <span dir="ltr">gene</span> <span dir="ltr">with</span> <span dir="ltr">smallest</span> <span dir="ltr">adjusted</span> _<span dir="ltr">p_</span> <span dir="ltr">value.</span>** ژن‌هایی که به رنگ صورتی مشخص شده‌اند مقدار <span dir="ltr">adjusted</span> <span dir="ltr">p-value</span> (مقدار <span dir="ltr">p</span> تعدیل‌شده) کمتر از 0.1 دارند.

# 8 حذف آثار دسته‌ای پنهان

فرض کنید ما نمی‌دانستیم در آزمایش از خطوط سلولی مختلف استفاده شده است و تنها اطلاع ما اعمال درمان با دگزامتازون بود. اثر خط سلولی بر شمارش‌ها در این صورت نمایانگر یک تغییر ناخواسته و پنهان خواهد بود که ممکن است بسیاری یا همهٔ ژن‌ها را در مجموعه‌داده تحت تاثیر قرار دهد. می‌توانیم از روش‌های آماری طراحی‌شده برای <span dir="ltr">RNA-seq</span> در بستهٔ _[<span dir="ltr">sva](https://bioconductor.org/packages/3.23/sva)_</span> (<span dir="ltr">Leek</span> 2014) یا بستهٔ _[<span dir="ltr">RUVSeq](https://bioconductor.org/packages/3.23/RUVSeq)_</span> (<span dir="ltr">Risso</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2014) در <span dir="ltr">Bioconductor</span> برای کشف چنین گروه‌بندی‌هایی از نمونه‌ها استفاده کنیم، و سپس آن‌ها را به طرح _<span dir="ltr">DESeqDataSet_</span> اضافه کنیم تا اثرشان را کنترل کنیم.

بستهٔ _<span dir="ltr">SVA_</span> از اصطلاح متغیرهای جانشین برای متغیرهای برآوردشده‌ای استفاده می‌کند که می‌خواهیم در تحلیل لحاظ شوند، در حالی که بستهٔ <span dir="ltr">RUV</span> از اصطلاح عوامل تغییر ناخواسته استفاده می‌کند و خودِ نام بسته «<span dir="ltr">Remove</span> <span dir="ltr">Unwanted</span> <span dir="ltr">Variation</span>» این عنوان را توضیح می‌دهد. ابتدا از _<span dir="ltr">SVA_</span> برای یافتن آثار دسته‌ای پنهان استفاده می‌کنیم و سپس به سراغ _<span dir="ltr">RUV_</span> می‌رویم.

## ۸٫۱ استفاده از <span dir="ltr">SVA</span> همراه با <span dir="ltr">DESeq2</span>

```
library("sva")
```

در ادامه ماتریسی از <span dir="ltr">normalized</span> <span dir="ltr">count</span> (شمارش)‌های نرمال‌شده را به‌دست می‌آوریم که در آن میانگین شمارش در میان نمونه‌ها بزرگ‌تر از 1 است. همان‌طور که پیش‌تر توضیح دادیم، هدف بازیابی هرگونه اثر دسته‌ای پنهان است، در حالتی که اطلاعات مربوط به خط سلولی را نداریم. بنابراین از ماتریس مدل کامل با متغیر _<span dir="ltr">dex_</span> استفاده می‌کنیم و یک ماتریس مدل کاهش‌یافته یا تهی که تنها شامل ترم ثابت است می‌سازیم. در پایان مشخص می‌کنیم که می‌خواهیم 2 متغیر جانشین برآورد شود. برای اطلاعات بیشتر صفحهٔ راهنمای تابع _<span dir="ltr">svaseq_</span> را با وارد کردن __<span dir="ltr">KEEP_BIDI_00000__</span> مطالعه کنید.

```
dat  <- counts(dds, normalized = TRUE)
idx  <- rowMeans(dat) > 1
dat  <- dat[idx, ]
mod  <- model.matrix(~ dex, colData(dds))
mod0 <- model.matrix(~   1, colData(dds))
svseq <- svaseq(dat, mod, mod0, n.sv = 2)
```

```
## Number of significant surrogate variables is:  2 
## Iteration (out of 5 ):1  2  3  4  5
```

```
svseq$sv
```

```
##            [,1]        [,2]
## [1,]  0.2096171 -0.37402683
## [2,]  0.2139238 -0.38481048
## [3,]  0.1486319 -0.19478674
## [4,]  0.1314682 -0.24741213
## [5,]  0.2553053  0.53388836
## [6,]  0.2569562  0.56828275
## [7,] -0.6238462  0.05013275
## [8,] -0.5920563  0.04873233
```
از آن‌جا که در واقع خطوط سلولی را می‌شناسیم، می‌توانیم ببینیم روش <span dir="ltr">SVA</span> تا چه حد در بازسازی این متغیرها موفق بوده است (شکل زیر).

```
par(mfrow = c(2, 1), mar = c(3,5,3,1))
for (i in 1:2) {
  stripchart(svseq$sv[, i] ~ dds$cell, vertical = TRUE, main = paste0("SV", i))
  abline(h = 0)
 }
```

**متغیرهای جانشین ۱ و ۲ بر حسب خط سلولی رسم شده‌اند.** در اینجا منبع پنهان تغییرپذیری (خط سلولی) را می‌دانیم و بنابراین می‌توانیم مشاهده کنیم که رویهٔ <span dir="ltr">SVA</span> چگونه یک منبع تغییر را که با خط سلولی همبسته است شناسایی می‌کند.

در انتها، برای استفاده از <span dir="ltr">SVA</span> به‌منظور حذف هر تأثیری که متغیرهای جانشین ممکن است روی <span dir="ltr">count</span> (شمارش)ها داشته باشند، کافی است این دو متغیر جانشین را به‌صورت ستون به _<span dir="ltr">DESeqDataSet_</span> اضافه کنیم و سپس آن‌ها را در طراحی وارد کنیم:

```
ddssva <- dds
ddssva$SV1 <- svseq$sv[,1]
ddssva$SV2 <- svseq$sv[,2]
design(ddssva) <- ~ SV1 + SV2 + dex
```

سپس می‌توانیم با اجرای _<span dir="ltr">DESeq_</span> با طراحی جدید، نتایجی را به‌دست آوریم که برای متغیرهای جانشین کنترل‌شده باشند.

## ۸٫۲ استفاده از <span dir="ltr">RUV</span> همراه با <span dir="ltr">DESeq2</span>

همچنین می‌توانیم از روش _<span dir="ltr">RUV_</span> در بستهٔ _<span dir="ltr">RUVSeq_</span> برای شناسایی <span dir="ltr">batch</span> <span dir="ltr">effect</span> (اثر دسته‌ای)های پنهان استفاده کنیم.

```
library("RUVSeq")
```

می‌توانیم از تابع __<span dir="ltr">KEEP_BIDI_00000__</span> برای برآورد عوامل تغییرات ناخواسته استفاده کنیم؛ این عوامل مشابهِ <span dir="ltr">surrogate</span> <span dir="ltr">variables</span> در _<span dir="ltr">SVA_</span> هستند. تفاوت نسبت به روش _<span dir="ltr">SVA_</span> که پیش‌تر نشان داده شد این است که ابتدا _<span dir="ltr">DESeq_</span> و _<span dir="ltr">results_</span> را اجرا می‌کنیم تا <span dir="ltr">p</span>‑<span dir="ltr">value</span>هایی برای تحلیل بدون اطلاع از دسته‌ها به‌دست آوریم، مثلاً فقط __<span dir="ltr">KEEP_BIDI_00001__.</span> فرض کنید جدول نتایج حاصل __<span dir="ltr">KEEP_BIDI_00002__</span> باشد؛ سپس مجموعه‌ای از ژن‌های کنترل تجربی را با انتخاب <span dir="ltr">gene</span> (ژن)‌هایی که <span dir="ltr">p</span>‑<span dir="ltr">value</span> کوچک ندارند، استخراج می‌کنیم.

```
set <- newSeqExpressionSet(counts(dds))
idx  <- rowSums(counts(set) > 5) >= 2
set  <- set[idx, ]
set <- betweenLaneNormalization(set, which="upper")
not.sig <- rownames(res)[which(res$pvalue > .1)]
empirical <- rownames(set)[ rownames(set) %in% not.sig ]
set <- RUVg(set, empirical, k=2)
pData(set)
```

```
##                    W_1           W_2
## SRR1039508 -0.26933276  0.4109938600
## SRR1039509 -0.28309027  0.5195974173
## SRR1039512  0.01260963  0.0211629252
## SRR1039513 -0.14401331  0.0865517386
## SRR1039516  0.58465966  0.0131477643
## SRR1039517  0.59835009  0.0001659118
## SRR1039520 -0.21813265 -0.5302085106
## SRR1039521 -0.28105040 -0.5214111067
```

می‌توانیم عوامل برآوردشده توسط _<span dir="ltr">RUV_</span> را رسم کنیم:

```
par(mfrow = c(2, 1), mar = c(3,5,3,1))
for (i in 1:2) {
  stripchart(pData(set)[, i] ~ dds$cell, vertical = TRUE, main = paste0("W", i))
  abline(h = 0)
 }
```

**عوامل تغییرات ناخواسته بر حسب خط سلولی رسم شده‌اند.**

همان‌طور که پیش‌تر، اگر بخواهیم برای این عوامل کنترل قائل شویم، آن‌ها را به _<span dir="ltr">DESeqDataSet_</span> و به طراحی اضافه می‌کنیم:

```
ddsruv <- dds
ddsruv$W1 <- set$W_1
ddsruv$W2 <- set$W_2
design(ddsruv) <- ~ W1 + W2 + dex
```

سپس _<span dir="ltr">DESeq_</span> را با طراحی جدید اجرا می‌کنیم تا پارامترها و نتایج دوباره برآورد شوند.

# ۹ آزمایش‌های <span dir="ltr">time</span> <span dir="ltr">course</span> (دورهٔ زمانی)

_<span dir="ltr">DESeq2_</span> می‌تواند برای تحلیل تجربیات زمانی به‌کار رود؛ برای نمونه برای یافتن ژن‌هایی که در یک شرط خاص در طول زمان واکنش نشان می‌دهند در مقایسه با مجموعه‌ای از نمونه‌های پایه.

در اینجا یک تحلیل پایه‌ای سری زمانی را با بستهٔ دادهٔ _[<span dir="ltr">fission](https://bioconductor.org/packages/3.23/fission)_</span> نشان می‌دهیم که شامل شمارش‌های ژن برای یک سری زمانی <span dir="ltr">RNA-seq</span> از مخمر تقسیم‌شونده است (<span dir="ltr">Leong</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2014). مخمرها در معرض استرس اکسایشی قرار گرفتند و نیمی از نمونه‌ها حذف ژن _<span dir="ltr">atf21_</span> را داشتند. از فرمول طراحی‌ای استفاده می‌کنیم که اختلاف سویه در زمان 0، تغییرات در طول زمان، و هر اختلاف اختصاصی سویه در طول زمان را مدل می‌کند (ترم تداخل __<span dir="ltr">KEEP_BIDI_00001__</span>).

```
library("fission")
data("fission")
ddsTC <- DESeqDataSet(fission, ~ strain + minute + strain:minute)
```

بخش کد زیر یک آزمون نسبت درست‌نمایی را اجرا می‌کند که در آن اختلافات اختصاصی سویه در طول زمان حذف می‌شوند. ژن‌هایی که از این آزمون <span dir="ltr">p</span>‑<span dir="ltr">value</span>های کوچکی می‌گیرند، آن‌هایی هستند که در یک یا چند نقطهٔ زمانی پس از زمان صفر اثر اختصاصی سویه نشان داده‌اند. بنابراین توجه داشته باشید که ژن‌هایی که در هر دو سویه به‌طور مشابه در طول زمان افزایش یا کاهش یافته‌اند، <span dir="ltr">p</span>‑<span dir="ltr">value</span>های کوچکی نخواهند داشت.

```
ddsTC <- DESeq(ddsTC, test="LRT", reduced = ~ strain + minute)
resTC <- results(ddsTC)
resTC$symbol <- mcols(ddsTC)$symbol
head(resTC[order(resTC$padj),], 4)
```

```
## log2 fold change (MLE): strainmut.minute180 
## LRT p-value: '~ strain + minute + strain:minute' vs '~ strain + minute' 
## DataFrame with 4 rows and 7 columns
##               baseMean log2FoldChange     lfcSE      stat      pvalue
##              <numeric>      <numeric> <numeric> <numeric>   <numeric>
## SPBC2F12.09c   174.671     -2.6567195  0.752261   97.2834 1.97415e-19
## SPAC1002.18    444.505     -0.0509321  0.204299   56.9536 5.16955e-11
## SPAC1002.19    336.373     -0.3927490  0.573494   43.5339 2.87980e-08
## SPAC1002.17c   261.773     -1.1387648  0.606129   39.3158 2.05137e-07
##                     padj      symbol
##                <numeric> <character>
## SPBC2F12.09c 1.33453e-15       atf21
## SPAC1002.18  1.74731e-07        urg3
## SPAC1002.19  6.48916e-05        urg1
## SPAC1002.17c 3.46682e-04        urg2
```

این تنها یکی از آزمون‌هایی است که می‌توان به داده‌های سری زمانی اعمال کرد. گزینهٔ دیگر مدل‌سازی شمارش‌ها به‌عنوان یک تابع پیوستهٔ زمان و افزودن یک ترم تداخل بین شرط و آن تابع پیوسته است. می‌توان چنین مدلی را با توابع پایهٔ اسپلاین در <span dir="ltr">R</span> ساخت؛ رویکردی جدیدتر استفاده از فرآیندهای گاوسی است (<span dir="ltr">Tonner</span> <span dir="ltr">et</span> <span dir="ltr">al.</span> 2017).

می‌توانیم شمارش‌ها را برای گروه‌ها در طول زمان با استفاده از _[<span dir="ltr">ggplot2](https://cran.r-project.org/package=ggplot2)_</span> رسم کنیم؛ برای ژنی که کوچک‌ترین <span dir="ltr">adjusted</span> <span dir="ltr">p-value</span> (مقدار <span dir="ltr">p</span> تعدیل‌شده) را دارد — آزمون برای پروفایل زمانی وابسته به شرط و با در نظر گرفتن اختلافات در زمان 0 (شکل زیر). به‌خاطر داشته باشید که ترم‌های تداخل، اختلاف بین دو گروه در زمان مشخص پس از در نظر گرفتن اختلاف زمان 0 هستند.

```
fiss <- plotCounts(ddsTC, which.min(resTC$padj), 
                   intgroup = c("minute","strain"), returnData = TRUE)
fiss$minute <- as.numeric(as.character(fiss$minute))
ggplot(fiss,
  aes(x = minute, y = count, color = strain, group = strain)) + 
  geom_point() + stat_summary(fun.y=mean, geom="line") +
  scale_y_log10()
```

**شمارش‌های نرمال‌شده — نتیجهٔ <span dir="ltr">normalization</span> (نرمال‌سازی) — برای ژنی با تغییرات وابسته به شرط در طول زمان.**

آزمون‌های والد برای تغییرات چندبرابریِ لگاریتمی به پایهٔ 2 در نقاط زمانی منفرد را می‌توان با استفاده از آرگومان __<span dir="ltr">KEEP_BIDI_00000__</span> در _<span dir="ltr">results_</span> بررسی کرد:

```
resultsNames(ddsTC)
```

```
##  [1] "Intercept"           "strain_mut_vs_wt"    "minute_15_vs_0"     
##  [4] "minute_30_vs_0"      "minute_60_vs_0"      "minute_120_vs_0"    
##  [7] "minute_180_vs_0"     "strainmut.minute15"  "strainmut.minute30" 
## [10] "strainmut.minute60"  "strainmut.minute120" "strainmut.minute180"
```

```
res30 <- results(ddsTC, name="strainmut.minute30", test="Wald")
res30[which.min(res30$padj),]
```

```
## log2 fold change (MLE): strainmut.minute30 
## Wald test p-value: strainmut.minute30 
## DataFrame with 1 row and 6 columns
##               baseMean log2FoldChange     lfcSE      stat      pvalue      padj
##              <numeric>      <numeric> <numeric> <numeric>   <numeric> <numeric>
## SPBC2F12.09c   174.671       -2.60047  0.634343  -4.09947 4.14099e-05  0.279931
```

هم‌چنین می‌توان ژن‌های معنادار را بر اساس پروفایل‌های زمانی آن‌ها خوشه‌بندی کرد. ماتریسی از تغییرات چندبرابریِ لگاریتمی به پایهٔ 2 را با استفاده از تابع _<span dir="ltr">coef_</span> استخراج می‌کنیم. توجه داشته باشید که این‌ها برآوردهای بیشینهٔ درست‌نمایی هستند. برای به‌دست‌آوردن <span dir="ltr">LFC</span>های جمع‌شده (<span dir="ltr">shrunken</span>)، باید آن‌ها را یک ضریب در هر نوبت با استفاده از __<span dir="ltr">KEEP_BIDI_00000__</span> استخراج کرد.

```
betas <- coef(ddsTC)
colnames(betas)
```

```
##  [1] "Intercept"           "strain_mut_vs_wt"    "minute_15_vs_0"     
##  [4] "minute_30_vs_0"      "minute_60_vs_0"      "minute_120_vs_0"    
##  [7] "minute_180_vs_0"     "strainmut.minute15"  "strainmut.minute30" 
## [10] "strainmut.minute60"  "strainmut.minute120" "strainmut.minute180"
```

اکنون می‌توانیم تغییرات لگاریتمیِ پایهٔ 2 را در یک نقشهٔ حرارتی رسم کنیم (شکل زیر).

```
topGenes <- head(order(resTC$padj),20)
mat <- betas[topGenes, -c(1,2)]
thr <- 3 
mat[mat < -thr] <- -thr
mat[mat > thr] <- thr
pheatmap(mat, breaks=seq(from=-thr, to=thr, length=101),
         cluster_col=FALSE)
```

**نقشهٔ حرارتیِ تغییرات لگاریتمیِ پایهٔ 2 برای ژن‌هایی با کوچک‌ترین مقدار <span dir="ltr">p</span> تعدیل‌شده.** مجموعهٔ پایینِ ژن‌ها نشان‌دهندهٔ القای قوی بیان برای نمونه‌های پایه در دقایق ۱۵–۶۰ است (کادرهای قرمز در گوشهٔ پایین چپ)، ولی سپس اختلافات جزئی‌ای برای سویهٔ موتانت در مقاطع بعدی دیده می‌شود (نمایش در کادرهای گوشهٔ پایین راست).

# ۱۰ پیوست

## ۱۰٫۱ جزئیات به‌روز دربارهٔ کمی‌سازی

روند کاری فوق، مراحل برآورد فراوانی را که منجر به ایجاد اشیاء __<span dir="ltr">KEEP_BIDI_00000__</span> و __<span dir="ltr">KEEP_BIDI_00001__</span> در بستهٔ _<span dir="ltr">airway_</span> شد، تشریح می‌کند. این شامل نگاشت <span dir="ltr">read</span> (خوانش)های <span dir="ltr">RNA-seq</span> به رونوشت (<span dir="ltr">transcript</span>)‌های مرجع انسانی در <span dir="ltr">GENCODE</span> <span dir="ltr">v29</span> با استفاده از <span dir="ltr">salmon</span> <span dir="ltr">v0.14.1</span> بود. این گام برآورد فراوانی در سال 2019 انجام شد.

برای ارائهٔ جزئیات به‌روزتر دربارهٔ برآورد فراوانی، اطلاعات زیر را در پیوست قرار می‌دهیم. جزئیات به‌روز دربارهٔ برآورد فراوانی توسط <span dir="ltr">Vince</span> <span dir="ltr">Carey</span> در 2026 تهیه شده و از ابزارهای جدید و همچنین <span dir="ltr">GENCODE</span> <span dir="ltr">v49</span> استفاده می‌کند.

### ۱۰٫۱٫۱ دانلود فایل‌های <span dir="ltr">FASTQ</span>

روش‌های پیشنهادی برای دسترسی به داده‌های خام جهت پیش‌پردازش و تحلیل در طول زمان تغییر می‌کنند. از تاریخ 13 آوریل 2026، <span dir="ltr">NCBI</span> __<span dir="ltr">KEEP_BIDI_00000__</span> را برای عملیات شبکهٔ با کارایی بالا که منابع را از <span dir="ltr">Sequence</span> <span dir="ltr">Read</span> <span dir="ltr">Archive</span> بازیابی می‌کنند فراهم می‌کند. [<span dir="ltr">SRA-tools</span> <span dir="ltr">wiki](https://github.com/ncbi/sra-tools/wiki/08.-prefetch-and-fasterq-dump)</span> __<span dir="ltr">KEEP_BIDI_00002__</span> و __<span dir="ltr">KEEP_BIDI_00003__</span> را شرح می‌دهد. یکی از رویکردها برای دریافت فایل‌های <span dir="ltr">FASTQ</span> آزمایش <span dir="ltr">airway</span> استفادهٔ مستقیم از __<span dir="ltr">KEEP_BIDI_00004__</span> است. دستورات زیر برای یک نمونه <span dir="ltr">FASTQ</span> فشرده‌شده با <span dir="ltr">gzip</span> تولید می‌کنند:

```
fasterq-dump -p -e 4 SRR1039509
gzip SRR1039509_1.fastq
gzip SRR1039509_2.fastq
```

پس از اجرای این روند برای ۸ نمونهٔ آزمایش <span dir="ltr">airway</span>، تقریباً ۲۲ گیگابایت <span dir="ltr">FASTQ</span> فشرده موجود خواهد بود.

### ۱۰٫۱٫۲ ساخت نمایهٔ <span dir="ltr">Salmon</span>

ما از

```
salmon index -t gencode.v49.transcripts.fa.gz -i gencode.v49_salmon_1.11.4
```

پس از بازیابی <span dir="ltr">FASTA</span> فشرده از [<span dir="ltr">GENCODE](https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/gencode.v49.transcripts.fa.gz)</span> استفاده کردیم.

فرآیند ایندکس‌سازی پیام‌های زیادی تولید می‌کند. برخی نمونه‌ها:

```
[2026-04-13 06:23:04.280] [puff::index::jointLog] [warning] Entry with header [ENST00000631435.1|ENSG00000282253.1|OTTHUMG00000190586.2|OTTHUMT00000485282.2|TRBD1-201|TRBD1|12|TR_D_gene|], had length less than equal to the k-mer length of 31 (perhaps after poly-A clipping)

[2026-04-13 06:23:04.314] [puff::index::jointLog] [warning] Removed 16702 transcripts that were sequence duplicates of indexed transcripts.
[2026-04-13 06:23:04.314] [puff::index::jointLog] [warning] If you wish to retain duplicate transcripts, please use the `--keepDuplicates` flag
[2026-04-13 06:23:04.320] [puff::index::jointLog] [info] Replaced 100014 non-ATCG nucleotides
[2026-04-13 06:23:04.320] [puff::index::jointLog] [info] Clipped poly-A tails from 9880 transcripts
wrote 516988 cleaned references
[2026-04-13 06:23:05.600] [puff::index::jointLog] [info] Filter size not provided; estimating from number of distinct k-mers 
[2026-04-13 06:23:12.270] [puff::index::jointLog] [info] ntHll estimated 185456630 distinct k-mers, setting filter size to 2^32
```

پوشهٔ حاصل دارای محتوایی به‌صورت زیر است:

```
gencode.v49_salmon_1.11.4
├── complete_ref_lens.bin
├── ctable.bin
├── ctg_offsets.bin
├── duplicate_clusters.tsv
├── info.json
├── pre_indexing.log
├── ref_indexing.log
├── refAccumLengths.bin
├── reflengths.bin
├── refseq.bin
├── sshash.bin
└── versionInfo.json
```

### ۱۰٫۱٫۳ کمی‌سازی <span dir="ltr">abundance</span> (فراوانی) با <span dir="ltr">Salmon</span>

فرمان <span dir="ltr">snakemake</span> با گزینهٔ __<span dir="ltr">KEEP_BIDI_00000__</span> روی یک <span dir="ltr">M4</span> <span dir="ltr">macbook</span> <span dir="ltr">air</span> با 32 <span dir="ltr">GB</span> حافظهٔ رم اجرا شد و در مدت یک ساعت تکمیل شد.

پوشهٔ تولیدشده برای یک نمونه ساختاری به‌شکل زیر دارد:

```
quants
├── SRR1039508
│   ├── aux_info
│   │   ├── ambig_info.tsv
│   │   ├── bootstrap
│   │   │   ├── bootstraps.gz
│   │   │   └── names.tsv.gz
│   │   ├── exp_gc.gz
│   │   ├── expected_bias.gz
│   │   ├── fld.gz
│   │   ├── meta_info.json
│   │   ├── obs_gc.gz
│   │   ├── observed_bias_3p.gz
│   │   └── observed_bias.gz
│   ├── cmd_info.json
│   ├── lib_format_counts.json
│   ├── libParams
│   │   └── flenDist.txt
│   ├── logs
│   │   └── salmon_quant.log
│   └── quant.sf
```

مجموع فضای دیسک برای برآوردهای فراوانیِ ۸ نمونه تقریباً ۸ گیگابایت بود.

### ۱۰٫۱٫۴ تولید <span dir="ltr">RangedSummarizedExperiment</span> با <span dir="ltr">tximeta</span>

با <span dir="ltr">Gencode</span> <span dir="ltr">v49</span>، __<span dir="ltr">KEEP_BIDI_00000__</span> روی برآوردهای فراوانی اعمال شد.
برای ۸ نمونه پیام‌هایی تولید می‌شود که شامل موارد زیر است:

```
building TxDb with 'txdbmaker' package
Import genomic features from the file as a GRanges object ... trying URL 'ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/gencode.v49.annotation.gtf.gz'
Content type 'unknown' length 93374019 bytes (89.0 MB)
==================================================
OK
Prepare the 'metadata' data frame ... OK
Make the TxDb object ... OK
generating transcript ranges
fetching genome info for GENCODE
Warning messages:
1: In .get_cds_IDX(mcols0$type, mcols0$phase) :
  The "phase" metadata column contains non-NA values for features of type
  stop_codon. This information was ignored.
2: In .makeTxDb_normarg_chrominfo(chrominfo) :
  genome version information is not available for this TxDb object
3: In checkAssays2Txps(assays, txps) : 

Warning: the annotation is missing some transcripts that were quantified.
11097 out of 517038 txps were missing from GTF/GFF but were in the indexed FASTA
(e.g. this can occur with transcripts located on haplotype chromosomes).
In order to build a ranged SummarizedExperiment, these txps were removed.
To keep these txps, and to skip adding ranges, use skipMeta=TRUE

Example missing txps: [ENST00000707233.1, ENST00000710274.1, ENST00000707308.1, ...]
```

بسته به وضعیت اتصال شما به اینترنت، برخی از پرس‌وجوهای <span dir="ltr">FTP</span> که __<span dir="ltr">KEEP_BIDI_00000__</span> از طرف کاربر انجام می‌دهد ممکن است شکست بخورند. به خطاهای 421 «سرویس در دسترس نیست» توجه کنید، و در صورت مشاهده، پس از بهبود اتصال مجدداً تلاش کنید.

# 11 اطلاعات نشست

در بخش پایانی این سند، تابع _<span dir="ltr">sessionInfo_</span> را فراخوانی می‌کنیم که شمارهٔ نسخهٔ <span dir="ltr">R</span> و نسخه‌های تمام بسته‌های به‌کاررفته در این نشست را گزارش می‌دهد. نگهداری چنین گزارشی عادت خوبی است، زیرا در صورت توقف اجرای یک اسکریپت <span dir="ltr">R</span> یا تغییر نتایج به‌دلیل به‌روزرسانی توابع در نسخه‌های جدید بسته‌ها، کمک می‌کند تا منشأ مشکل را شناسایی کنید. با قرار دادن این گزارش در انتهای اسکریپت، گزارش‌های شما قابل بازتولیدتر خواهند شد.

اطلاعات نشست باید همیشه همراه با تمام کدهای به‌کاررفته در تحلیل، در هر ایمیلی که به <span dir="ltr">https://support.bioconductor.org/</span> ارسال می‌شود نیز ضمیمه گردد.

```
sessionInfo()
```

```
## R version 4.6.0 RC (2026-04-17 r89917)
## Platform: x86_64-pc-linux-gnu
## Running under: Ubuntu 24.04.4 LTS
## 
## Matrix products: default
## BLAS:   /home/biocbuild/bbs-3.23-bioc/R/lib/libRblas.so 
## LAPACK: /usr/lib/x86_64-linux-gnu/lapack/liblapack.so.3.12.0  LAPACK version 3.12.0
## 
## locale:
##  [1] LC_CTYPE=en_US.UTF-8       LC_NUMERIC=C              
##  [3] LC_TIME=en_GB              LC_COLLATE=C              
##  [5] LC_MONETARY=en_US.UTF-8    LC_MESSAGES=en_US.UTF-8   
##  [7] LC_PAPER=en_US.UTF-8       LC_NAME=C                 
##  [9] LC_ADDRESS=C               LC_TELEPHONE=C            
## [11] LC_MEASUREMENT=en_US.UTF-8 LC_IDENTIFICATION=C       
## 
## time zone: America/New_York
## tzcode source: system (glibc)
## 
## attached base packages:
## [1] grid      stats4    stats     graphics  grDevices utils     datasets 
## [8] methods   base     
## 
## other attached packages:
##  [1] fission_1.32.0              RUVSeq_1.46.0              
##  [3] edgeR_4.10.1                limma_3.68.4               
##  [5] EDASeq_2.46.0               ShortRead_1.70.0           
##  [7] GenomicAlignments_1.48.0    Rsamtools_2.28.0           
##  [9] Biostrings_2.80.1           XVector_0.52.0             
## [11] sva_3.60.0                  BiocParallel_1.46.0        
## [13] mgcv_1.9-4                  nlme_3.1-169               
## [15] Gviz_1.56.0                 org.Hs.eg.db_3.23.1        
## [17] genefilter_1.94.0           apeglm_1.34.0              
## [19] ggbeeswarm_0.7.3            glmpca_0.2.0               
## [21] PoiClaClu_1.0.2.1           RColorBrewer_1.1-3         
## [23] pheatmap_1.0.13             ggplot2_4.0.3              
## [25] dplyr_1.2.1                 vsn_3.80.0                 
## [27] DESeq2_1.52.0               magrittr_2.0.5             
## [29] GenomicFeatures_1.64.0      AnnotationDbi_1.74.0       
## [31] tximeta_1.30.0              airway_1.32.0              
## [33] SummarizedExperiment_1.42.0 Biobase_2.72.0             
## [35] GenomicRanges_1.64.0        Seqinfo_1.2.0              
## [37] IRanges_2.46.0              S4Vectors_0.50.1           
## [39] BiocGenerics_0.58.1         generics_0.1.4             
## [41] MatrixGenerics_1.24.0       matrixStats_1.5.0          
## [43] rmarkdown_2.31              knitr_1.51                 
## [45] BiocStyle_2.40.0           
## 
## loaded via a namespace (and not attached):
##   [1] splines_4.6.0            BiocIO_1.22.0            bitops_1.0-9            
##   [4] filelock_1.0.3           R.oo_1.27.1              tibble_3.3.1            
##   [7] preprocessCore_1.74.0    XML_3.99-0.23            rpart_4.1.27            
##  [10] lifecycle_1.0.5          httr2_1.2.2              pwalign_1.8.0           
##  [13] lattice_0.22-9           vroom_1.7.1              ensembldb_2.36.1        
##  [16] MASS_7.3-65              backports_1.5.1          Hmisc_5.2-5             
##  [19] sass_0.4.10              jquerylib_0.1.4          yaml_2.3.12             
##  [22] otel_0.2.0               DBI_1.3.0                abind_1.4-8             
##  [25] R.utils_2.13.0           purrr_1.2.2              AnnotationFilter_1.36.0 
##  [28] biovizBase_1.60.0        RCurl_1.98-1.18          nnet_7.3-20             
##  [31] VariantAnnotation_1.58.0 rappdirs_0.3.4           annotate_1.90.0         
##  [34] codetools_0.2-20         DelayedArray_0.38.2      tidyselect_1.2.1        
##  [37] UCSC.utils_1.8.0         farver_2.1.2             BiocFileCache_3.2.0     
##  [40] base64enc_0.1-6          jsonlite_2.0.0           Formula_1.2-5           
##  [43] survival_3.8-6           bbmle_1.0.25.1           tools_4.6.0             
##  [46] progress_1.2.3           Rcpp_1.1.1-1.1           glue_1.8.1              
##  [49] gridExtra_2.3            SparseArray_1.12.2       xfun_0.58               
##  [52] GenomeInfoDb_1.48.0      withr_3.0.2              numDeriv_2016.8-1.1     
##  [55] BiocManager_1.30.27      fastmap_1.2.0            latticeExtra_0.6-31     
##  [58] digest_0.6.39            R6_2.6.1                 colorspace_2.1-2        
##  [61] jpeg_0.1-11              dichromat_2.0-0.1        biomaRt_2.68.0          
##  [64] RSQLite_3.53.1           R.methodsS3_1.8.2        cigarillo_1.2.0         
##  [67] hexbin_1.28.5            data.table_1.18.4        rtracklayer_1.72.0      
##  [70] htmlwidgets_1.6.4        prettyunits_1.2.0        httr_1.4.8              
##  [73] S4Arrays_1.12.0          pkgconfig_2.0.3          gtable_0.3.6            
##  [76] blob_1.3.0               hwriter_1.3.2.1          S7_0.2.2                
##  [79] htmltools_0.5.9          bookdown_0.46            ProtGenerics_1.44.0     
##  [82] scales_1.4.0             png_0.1-9                rstudioapi_0.18.0       
##  [85] tzdb_0.5.0               rjson_0.2.23             checkmate_2.3.4         
##  [88] coda_0.19-4.1            curl_7.1.0               bdsmatrix_1.3-7         
##  [91] cachem_1.1.0             stringr_1.6.0            BiocVersion_3.23.1      
##  [94] parallel_4.6.0           vipor_0.4.7              foreign_0.8-91          
##  [97] restfulr_0.0.16          pillar_1.11.1            vctrs_0.7.3             
## [100] dbplyr_2.5.2             xtable_1.8-8             cluster_2.1.8.2         
## [103] htmlTable_2.5.0          beeswarm_0.4.0           tximport_1.40.0         
## [106] evaluate_1.0.5           readr_2.2.0              tinytex_0.59            
## [109] magick_2.9.1             mvtnorm_1.4-0            cli_3.6.6               
## [112] locfit_1.5-9.12          compiler_4.6.0           rlang_1.2.0             
## [115] crayon_1.5.3             labeling_0.4.3           aroma.light_3.42.0      
## [118] interp_1.1-6             emdbook_1.3.14           affy_1.90.0             
## [121] plyr_1.8.9               stringi_1.8.7            deldir_2.0-4            
## [124] txdbmaker_1.8.0          lazyeval_0.2.3           Matrix_1.7-5            
## [127] BSgenome_1.80.0          hms_1.1.4                bit64_4.8.2             
## [130] KEGGREST_1.52.0          statmod_1.5.2            AnnotationHub_4.2.0     
## [133] memoise_2.0.1            affyio_1.82.0            bslib_0.11.0            
## [136] bit_4.6.0
```

# منابع

<span dir="ltr">Anders</span>, <span dir="ltr">Simon</span>, <span dir="ltr">and</span> <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber.</span> 2010. «<span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) برای داده‌های توالی <span dir="ltr">count</span> (شمارش).» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_</span> 11 (10): <span dir="ltr">R106+.</span> <<span dir="ltr">https://doi.org/10.1186/gb-2010-11-10-r106</span>> .

<span dir="ltr">Anders</span>, <span dir="ltr">Simon</span>, <span dir="ltr">Paul</span> <span dir="ltr">T.</span> <span dir="ltr">Pyl</span>, <span dir="ltr">and</span> <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber.</span> 2015. «<span dir="ltr">HTSeq</span> – یک چارچوب پایتون برای کار با داده‌های توالی‌یابی با توان بالا.» _<span dir="ltr">Bioinformatics_</span> 31 (2): 166–69. <<span dir="ltr">https://doi.org/10.1093/bioinformatics/btu638</span>> .

<span dir="ltr">Benjamini</span>, <span dir="ltr">Yoav</span>, <span dir="ltr">and</span> <span dir="ltr">Yosef</span> <span dir="ltr">Hochberg.</span> 1995. «کنترل <span dir="ltr">false</span> <span dir="ltr">discovery</span> <span dir="ltr">rate</span> (نرخ کشف کاذب): یک روش عملی و قدرتمند برای <span dir="ltr">multiple</span> <span dir="ltr">testing</span> (آزمون‌های چندگانه).» _<span dir="ltr">Journal</span> <span dir="ltr">of</span> <span dir="ltr">the</span> <span dir="ltr">Royal</span> <span dir="ltr">Statistical</span> <span dir="ltr">Society.</span> <span dir="ltr">Series</span> <span dir="ltr">B</span> (<span dir="ltr">Methodological</span>)_ 57 (1): 289–300. <<span dir="ltr">http://www.jstor.org/stable/2346101</span>> .

<span dir="ltr">Bourgon</span>, <span dir="ltr">R.</span>, <span dir="ltr">R.</span> <span dir="ltr">Gentleman</span>, <span dir="ltr">and</span> <span dir="ltr">W.</span> <span dir="ltr">Huber.</span> 2010. «فیلتر مستقل توان کشف را در آزمایش‌های پرتوان افزایش می‌دهد.» _<span dir="ltr">Proceedings</span> <span dir="ltr">of</span> <span dir="ltr">the</span> <span dir="ltr">National</span> <span dir="ltr">Academy</span> <span dir="ltr">of</span> <span dir="ltr">Sciences_</span> 107 (21): 9546–51. <<span dir="ltr">https://doi.org/10.1073/pnas.0914005107</span>> .

<span dir="ltr">Bray</span>, <span dir="ltr">Nicolas</span>, <span dir="ltr">Harold</span> <span dir="ltr">Pimentel</span>, <span dir="ltr">Pall</span> <span dir="ltr">Melsted</span>, <span dir="ltr">and</span> <span dir="ltr">Lior</span> <span dir="ltr">Pachter.</span> 2016. «تقریب احتمالاتی نزدیک به بهینه برای کمی‌سازی <span dir="ltr">RNA-Seq.</span>» _<span dir="ltr">Nature</span> <span dir="ltr">Biotechnology_</span> 34: 525–27. <<span dir="ltr">http://dx.doi.org/10.1038/nbt.3519</span>> .

<span dir="ltr">Dudoit</span>, <span dir="ltr">Rine</span>, <span dir="ltr">Yee</span> <span dir="ltr">H.</span> <span dir="ltr">Yang</span>, <span dir="ltr">Matthew</span> <span dir="ltr">J.</span> <span dir="ltr">Callow</span>, <span dir="ltr">and</span> <span dir="ltr">Terence</span> <span dir="ltr">P.</span> <span dir="ltr">Speed.</span> 2002. «روش‌های آماری برای شناسایی ژن‌های متفاوت بیان‌شده در آزمایش‌های <span dir="ltr">cDNA</span> <span dir="ltr">microarray</span> تکرارشده.» _<span dir="ltr">Statistica</span> <span dir="ltr">Sinica_</span> , 111–39.

<span dir="ltr">Frankish</span>, <span dir="ltr">Adam</span>, <span dir="ltr">Alexandra</span> <span dir="ltr">Bignell</span>, <span dir="ltr">Andrew</span> <span dir="ltr">Berry</span>, <span dir="ltr">Andrew</span> <span dir="ltr">Yates</span>, <span dir="ltr">Anne</span> <span dir="ltr">Parker</span>, <span dir="ltr">Bianca</span> <span dir="ltr">M</span> <span dir="ltr">Schmitt</span>, <span dir="ltr">Bronwen</span> <span dir="ltr">Aken</span>, <span dir="ltr">et</span> <span dir="ltr">al.</span> 2018. «ژن‌شناسی مرجع <span dir="ltr">GENCODE</span> برای ژنوم‌های انسان و موش.» _<span dir="ltr">Nucleic</span> <span dir="ltr">Acids</span> <span dir="ltr">Research_</span> 47 (<span dir="ltr">D1</span>): <span dir="ltr">D766</span>–<span dir="ltr">D773.</span>

<span dir="ltr">Hardcastle</span>, <span dir="ltr">Thomas</span>, <span dir="ltr">and</span> <span dir="ltr">Krystyna</span> <span dir="ltr">Kelly.</span> 2010. «<span dir="ltr">baySeq:</span> روش‌های بیزی تجربی برای شناسایی <span dir="ltr">differential</span> <span dir="ltr">expression</span> (تحلیل بیان تفاضلی) در داده‌های شمارش توالی.» _<span dir="ltr">BMC</span> <span dir="ltr">Bioinformatics_</span> 11 (1): 422+. <<span dir="ltr">https://doi.org/10.1186/1471-2105-11-422</span>> .

<span dir="ltr">Himes</span>, <span dir="ltr">Blanca</span> <span dir="ltr">E.</span>, <span dir="ltr">Xiaofeng</span> <span dir="ltr">Jiang</span>, <span dir="ltr">Peter</span> <span dir="ltr">Wagner</span>, <span dir="ltr">Ruoxi</span> <span dir="ltr">Hu</span>, <span dir="ltr">Qiyu</span> <span dir="ltr">Wang</span>, <span dir="ltr">Barbara</span> <span dir="ltr">Klanderman</span>, <span dir="ltr">Reid</span> <span dir="ltr">M.</span> <span dir="ltr">Whitaker</span>, <span dir="ltr">et</span> <span dir="ltr">al.</span> 2014. «پروفایل‌سازی ترنسکریپتوم <span dir="ltr">RNA-Seq</span> نشان می‌دهد <span dir="ltr">CRISPLD2</span> ژنی پاسخ‌پذیر به گلوکوکورتیکوئید است که عملکرد سایتوکاین‌ها را در سلول‌های ماهیچهٔ صاف مجاری تنفسی تنظیم می‌کند.» _<span dir="ltr">PloS</span> <span dir="ltr">One_</span> 9 (6). <<span dir="ltr">https://doi.org/10.1371/journal.pone.0099625</span>> .

<span dir="ltr">Huber</span>, <span dir="ltr">Wolfgang</span>, <span dir="ltr">Vincent</span> <span dir="ltr">J.</span> <span dir="ltr">Carey</span>, <span dir="ltr">Robert</span> <span dir="ltr">Gentleman</span>, <span dir="ltr">Simon</span> <span dir="ltr">Anders</span>, <span dir="ltr">Marc</span> <span dir="ltr">Carlson</span>, <span dir="ltr">Benilton</span> <span dir="ltr">S.</span> <span dir="ltr">Carvalho</span>, <span dir="ltr">Hector</span> <span dir="ltr">Corrada</span> <span dir="ltr">C.</span> <span dir="ltr">Bravo</span>, <span dir="ltr">et</span> <span dir="ltr">al.</span> 2015. «هماهنگ‌سازی تحلیل‌های ژنومی پرتوان با <span dir="ltr">Bioconductor.</span>» _<span dir="ltr">Nature</span> <span dir="ltr">Methods_</span> 12 (2): 115–21. <<span dir="ltr">https://doi.org/10.1038/nmeth.3252</span>> .

<span dir="ltr">Ignatiadis</span>, <span dir="ltr">Nikolaos</span>, <span dir="ltr">Bernd</span> <span dir="ltr">Klaus</span>, <span dir="ltr">Judith</span> <span dir="ltr">Zaugg</span>, <span dir="ltr">and</span> <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber.</span> 2016. «وزن‌دهی فرضیه‌محور داده‌محور توان کشف را در آزمون‌های چندگانه در مقیاس ژنومی افزایش می‌دهد.» _<span dir="ltr">Nature</span> <span dir="ltr">Methods_</span> . <<span dir="ltr">http://dx.doi.org/10.1038/nmeth.3885</span>> .

<span dir="ltr">K</span>ö<span dir="ltr">ster</span>, <span dir="ltr">Johannes</span>, <span dir="ltr">and</span> <span dir="ltr">Sven</span> <span dir="ltr">Rahmann.</span> 2012. «<span dir="ltr">Snakemake</span> - یک سامانهٔ کاریابی بیوانفورماتیک مقیاس‌پذیر.» _<span dir="ltr">Bioinformatics_</span> . <<span dir="ltr">https://doi.org/10.1093/bioinformatics/bts480</span>> .

<span dir="ltr">Law</span>, <span dir="ltr">Charity</span> <span dir="ltr">W.</span>, <span dir="ltr">Yunshun</span> <span dir="ltr">Chen</span>, <span dir="ltr">Wei</span> <span dir="ltr">Shi</span>, <span dir="ltr">and</span> <span dir="ltr">Gordon</span> <span dir="ltr">K.</span> <span dir="ltr">Smyth.</span> 2014. «<span dir="ltr">Voom:</span> وزن‌های دقت ابزارهای مدل‌خطی را برای شمارش‌های <span dir="ltr">read</span> (خوانش) در <span dir="ltr">RNA</span>‑<span dir="ltr">seq</span> فعال می‌سازند.» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_</span> 15 (2): <span dir="ltr">R29+.</span> <<span dir="ltr">https://doi.org/10.1186/gb-2014-15-2-r29</span>> .

<span dir="ltr">Lawrence</span>, <span dir="ltr">Michael</span>, <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber</span>, <span dir="ltr">Herv</span>é <span dir="ltr">Pag</span>è<span dir="ltr">s</span>, <span dir="ltr">Patrick</span> <span dir="ltr">Aboyoun</span>, <span dir="ltr">Marc</span> <span dir="ltr">Carlson</span>, <span dir="ltr">Robert</span> <span dir="ltr">Gentleman</span>, <span dir="ltr">Martin</span> <span dir="ltr">T.</span> <span dir="ltr">Morgan</span>, <span dir="ltr">and</span> <span dir="ltr">Vincent</span> <span dir="ltr">J.</span> <span dir="ltr">Carey.</span> 2013. «نرم‌افزاری برای محاسبه و حاشیه‌نویسی بازه‌های ژنومی.» <span dir="ltr">Edited</span> <span dir="ltr">by</span> <span dir="ltr">Andreas</span> <span dir="ltr">Prlic.</span> _<span dir="ltr">PLoS</span> <span dir="ltr">Computational</span> <span dir="ltr">Biology_</span> 9 (8): <span dir="ltr">e1003118+.</span> <<span dir="ltr">https://doi.org/10.1371/journal.pcbi.1003118</span>> .

<span dir="ltr">Leek</span>, <span dir="ltr">Jeffrey</span> <span dir="ltr">T.</span> 2014. «<span dir="ltr">svaseq:</span> حذف <span dir="ltr">batch</span> <span dir="ltr">effect</span> (اثر دسته‌ای) و سایر نویزهای ناخواسته از داده‌های توالی‌یابی.» _<span dir="ltr">Nucleic</span> <span dir="ltr">Acids</span> <span dir="ltr">Research_</span> 42 (21): 000. <<span dir="ltr">https://doi.org/10.1093/nar/gku864</span>> .

<span dir="ltr">Leng</span>, <span dir="ltr">N.</span>, <span dir="ltr">J.</span> <span dir="ltr">A.</span> <span dir="ltr">Dawson</span>, <span dir="ltr">J.</span> <span dir="ltr">A.</span> <span dir="ltr">Thomson</span>, <span dir="ltr">V.</span> <span dir="ltr">Ruotti</span>, <span dir="ltr">A.</span> <span dir="ltr">I.</span> <span dir="ltr">Rissman</span>, <span dir="ltr">B.</span> <span dir="ltr">M.</span> <span dir="ltr">G.</span> <span dir="ltr">Smits</span>, <span dir="ltr">J.</span> <span dir="ltr">D.</span> <span dir="ltr">Haag</span>, <span dir="ltr">M.</span> <span dir="ltr">N.</span> <span dir="ltr">Gould</span>, <span dir="ltr">R.</span> <span dir="ltr">M.</span> <span dir="ltr">Stewart</span>, <span dir="ltr">and</span> <span dir="ltr">C.</span> <span dir="ltr">Kendziorski.</span> 2013. «<span dir="ltr">EBSeq:</span> یک مدل سلسله‌مراتبی بیزی تجربی برای استنباط در آزمایش‌های <span dir="ltr">RNA</span>‑<span dir="ltr">seq.</span>» _<span dir="ltr">Bioinformatics_</span> 29 (8): 1035–43. <<span dir="ltr">https://doi.org/10.1093/bioinformatics/btt087</span>> .

<span dir="ltr">Leong</span>, <span dir="ltr">Hui</span> <span dir="ltr">S.</span>, <span dir="ltr">Keren</span> <span dir="ltr">Dawson</span>, <span dir="ltr">Chris</span> <span dir="ltr">Wirth</span>, <span dir="ltr">Yaoyong</span> <span dir="ltr">Li</span>, <span dir="ltr">Yvonne</span> <span dir="ltr">Connolly</span>, <span dir="ltr">Duncan</span> <span dir="ltr">L.</span> <span dir="ltr">Smith</span>, <span dir="ltr">Caroline</span> <span dir="ltr">R.</span> <span dir="ltr">Wilkinson</span>, <span dir="ltr">and</span> <span dir="ltr">Crispin</span> <span dir="ltr">J.</span> <span dir="ltr">Miller.</span> 2014. «یک سامانهٔ غیرکدکنندهٔ جهانی <span dir="ltr">RNA</span> سطوح پروتئینی جلبک شکافندهٔ (<span dir="ltr">fission</span> <span dir="ltr">yeast</span>) را در پاسخ به استرس تنظیم می‌کند.» _<span dir="ltr">Nature</span> <span dir="ltr">Communications_</span> 5\. <<span dir="ltr">https://doi.org/10.1038/ncomms4947</span>> .

<span dir="ltr">Li</span>, <span dir="ltr">Bo</span>, <span dir="ltr">and</span> <span dir="ltr">Colin</span> <span dir="ltr">N.</span> <span dir="ltr">Dewey.</span> 2011. «<span dir="ltr">RSEM:</span> برآورد فراوانی (<span dir="ltr">quantification</span>) دقیق رونوشت‌ها از داده‌های <span dir="ltr">RNA</span>‑<span dir="ltr">Seq</span> با یا بدون ژنوم مرجع.» _<span dir="ltr">BMC</span> <span dir="ltr">Bioinformatics_</span> 12: 323+. <<span dir="ltr">https://doi.org/10.1186/1471-2105-12-3231</span>> .

<span dir="ltr">Liao</span>, <span dir="ltr">Y.</span>, <span dir="ltr">G.</span> <span dir="ltr">K.</span> <span dir="ltr">Smyth</span>, <span dir="ltr">and</span> <span dir="ltr">W.</span> <span dir="ltr">Shi.</span> 2014. «<span dir="ltr">featureCounts:</span> یک برنامهٔ عمومی و کارآمد برای تخصیص خوانش‌ها به ویژگی‌های ژنومی.» _<span dir="ltr">Bioinformatics_</span> 30 (7): 923–30. <<span dir="ltr">https://doi.org/10.1093/bioinformatics/btt656</span>> .

<span dir="ltr">Love</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span>, <span dir="ltr">John</span> <span dir="ltr">B.</span> <span dir="ltr">Hogenesch</span>, <span dir="ltr">and</span> <span dir="ltr">Rafael</span> <span dir="ltr">A.</span> <span dir="ltr">Irizarry.</span> 2016. «مدل‌سازی شیب توالی قطعات <span dir="ltr">RNA</span>‑<span dir="ltr">Seq</span> خطاهای سیستماتیک در برآورد فراوانی (<span dir="ltr">abundance</span> (فراوانی)) رونوشت‌ها را کاهش می‌دهد.» _<span dir="ltr">Nature</span> <span dir="ltr">Biotechnology_</span> 34 (12): 1287–91. <<span dir="ltr">http://dx.doi.org/10.1038/nbt.3682</span>> .

<span dir="ltr">Love</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span>, <span dir="ltr">Wolfgang</span> <span dir="ltr">Huber</span>, <span dir="ltr">and</span> <span dir="ltr">Simon</span> <span dir="ltr">Anders.</span> 2014. «برآورد تعدیل‌شدهٔ تغییرات تابی (<span dir="ltr">fold</span> <span dir="ltr">change</span>) و <span dir="ltr">dispersion</span> (پراکندگی) برای داده‌های <span dir="ltr">RNA</span>‑<span dir="ltr">seq</span> با <span dir="ltr">DESeq2.</span>» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_</span> 15 (12): 550+. <<span dir="ltr">https://doi.org/10.1186/s13059-014-0550-8</span>> .

<span dir="ltr">Love</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span>, <span dir="ltr">Charlotte</span> <span dir="ltr">Soneson</span>, <span dir="ltr">Peter</span> <span dir="ltr">F.</span> <span dir="ltr">Hickey</span>, <span dir="ltr">Lisa</span> <span dir="ltr">K.</span> <span dir="ltr">Johnson</span>, <span dir="ltr">N.</span> <span dir="ltr">Tessa</span> <span dir="ltr">Pierce</span>, <span dir="ltr">Lori</span> <span dir="ltr">Shepherd</span>, <span dir="ltr">Martin</span> <span dir="ltr">Morgan</span>, <span dir="ltr">and</span> <span dir="ltr">Rob</span> <span dir="ltr">Patro.</span> 2020. «<span dir="ltr">Tximeta:</span> جمع‌های بررسی چکسام‌های توالی مرجع برای شناسایی منشأ در <span dir="ltr">RNA</span>‑<span dir="ltr">seq.</span>» _<span dir="ltr">PLOS</span> <span dir="ltr">Computational</span> <span dir="ltr">Biology_</span> . <<span dir="ltr">https://doi.org/10.1371/journal.pcbi.1007664</span>> .
<span dir="ltr">Patro</span>, <span dir="ltr">Rob</span>, <span dir="ltr">Geet</span> <span dir="ltr">Duggal</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span> <span dir="ltr">Love</span>, <span dir="ltr">Rafael</span> <span dir="ltr">A.</span> <span dir="ltr">Irizarry</span>, <span dir="ltr">and</span> <span dir="ltr">Carl</span> <span dir="ltr">Kingsford.</span> 2017. «<span dir="ltr">Salmon</span> برآورد فراوانی بیان <span dir="ltr">transcript</span> (رونوشت) را به‌سرعت و با درنظر گرفتن بایاس ارائه می‌کند.» _<span dir="ltr">Nature</span> <span dir="ltr">Methods_.</span> <<span dir="ltr">http://dx.doi.org/10.1038/nmeth.4197</span>> .

<span dir="ltr">Risso</span>, <span dir="ltr">Davide</span>, <span dir="ltr">John</span> <span dir="ltr">Ngai</span>, <span dir="ltr">Terence</span> <span dir="ltr">P.</span> <span dir="ltr">Speed</span>, <span dir="ltr">and</span> <span dir="ltr">Sandrine</span> <span dir="ltr">Dudoit.</span> 2014. «<span dir="ltr">normalization</span> (نرمال‌سازی) داده‌های <span dir="ltr">RNA-seq</span> با استفاده از تحلیل عاملی روی <span dir="ltr">gene</span> (ژن)‌های کنترلی یا نمونه‌ها.» _<span dir="ltr">Nature</span> <span dir="ltr">Biotechnology_</span> 32 (9): 896–902. <<span dir="ltr">https://doi.org/10.1038/nbt.2931</span>> .

<span dir="ltr">Robert</span>, <span dir="ltr">Christelle</span>, <span dir="ltr">and</span> <span dir="ltr">Mick</span> <span dir="ltr">Watson.</span> 2015. «خطاها در برآورد فراوانی <span dir="ltr">RNA-Seq</span> بر <span dir="ltr">gene</span> (ژن)هایی که با بیماری‌های انسانی مرتبط‌اند تأثیر می‌گذارد.» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_.</span> <<span dir="ltr">https://doi.org/10.1186/s13059-015-0734-x</span>> .

<span dir="ltr">Robinson</span>, <span dir="ltr">M.</span> <span dir="ltr">D.</span>, <span dir="ltr">D.</span> <span dir="ltr">J.</span> <span dir="ltr">McCarthy</span>, <span dir="ltr">and</span> <span dir="ltr">G.</span> <span dir="ltr">K.</span> <span dir="ltr">Smyth.</span> 2009. «<span dir="ltr">edgeR:</span> یک بسته <span dir="ltr">Bioconductor</span> برای <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) داده‌های دیجیتال بیان <span dir="ltr">gene</span> (ژن).» _<span dir="ltr">Bioinformatics_</span> 26 (1): 139–40. <<span dir="ltr">https://doi.org/10.1093/bioinformatics/btp616</span>> .

<span dir="ltr">Schurch</span>, <span dir="ltr">Nicholas</span> <span dir="ltr">J.</span>, <span dir="ltr">Pieta</span> <span dir="ltr">Schofield</span>, <span dir="ltr">Marek</span> <span dir="ltr">Gierlinski</span>, <span dir="ltr">Christian</span> <span dir="ltr">Cole</span>, <span dir="ltr">Alexander</span> <span dir="ltr">Sherstnev</span>, <span dir="ltr">Vijender</span> <span dir="ltr">Singh</span>, <span dir="ltr">Nicola</span> <span dir="ltr">Wrobel</span>, <span dir="ltr">et</span> <span dir="ltr">al.</span> 2016. «چه تعداد تکرار زیستی در یک آزمایش <span dir="ltr">RNA-Seq</span> لازم است و کدام ابزار برای <span dir="ltr">differential</span> <span dir="ltr">expression</span> <span dir="ltr">analysis</span> (تحلیل بیان تفاضلی) مناسب‌تر است؟» 22 (6): 839–51. <<span dir="ltr">https://doi.org/10.1261/rna.053959.115</span>> .

<span dir="ltr">Soneson</span>, <span dir="ltr">Charlotte</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span> <span dir="ltr">Love</span>, <span dir="ltr">and</span> <span dir="ltr">Mark</span> <span dir="ltr">Robinson.</span> 2015. «<span dir="ltr">Differential</span> <span dir="ltr">analyses</span> برای <span dir="ltr">RNA-seq:</span> برآوردهای در سطح <span dir="ltr">transcript</span> (رونوشت) استنباط‌های در سطح <span dir="ltr">gene</span> (ژن) را بهبود می‌بخشند.» _<span dir="ltr">F1000Research_</span> 4 (1521). <<span dir="ltr">https://doi.org/10.12688/f1000research.7563.1</span>> .

<span dir="ltr">Srivastava</span>, <span dir="ltr">Avi</span>, <span dir="ltr">Laraib</span> <span dir="ltr">Malik</span>, <span dir="ltr">Hirak</span> <span dir="ltr">Sarkar</span>, <span dir="ltr">Mohsen</span> <span dir="ltr">Zakeri</span>, <span dir="ltr">Fatemeh</span> <span dir="ltr">Almodaresi</span>, <span dir="ltr">Charlotte</span> <span dir="ltr">Soneson</span>, <span dir="ltr">Michael</span> <span dir="ltr">I.</span> <span dir="ltr">Love</span>, <span dir="ltr">Carl</span> <span dir="ltr">Kingsford</span>, <span dir="ltr">and</span> <span dir="ltr">Rob</span> <span dir="ltr">Patro.</span> 2020. «روش‌های تراز و نگاشت بر برآورد فراوانی <span dir="ltr">transcript</span> (رونوشت) تأثیر می‌گذارند.» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_</span> 21 (1): 239. <<span dir="ltr">https://doi.org/10.1186/s13059-020-02151-8</span>> .

<span dir="ltr">Tonner</span>, <span dir="ltr">Peter</span> <span dir="ltr">D</span>, <span dir="ltr">Cynthia</span> <span dir="ltr">L</span> <span dir="ltr">Darnell</span>, <span dir="ltr">Barbara</span> <span dir="ltr">E</span> <span dir="ltr">Engelhardt</span>, <span dir="ltr">and</span> <span dir="ltr">Amy</span> <span dir="ltr">K</span> <span dir="ltr">Schmid.</span> 2017. «شناسایی رشد تفاضلی جمعیت‌های میکروبی با رگرسیون فرآیند گاوسی.» _<span dir="ltr">Genome</span> <span dir="ltr">Research_</span> 27: 320–33. <<span dir="ltr">https://doi.org/10.1101/gr.210286.116</span>> .

<span dir="ltr">Townes</span>, <span dir="ltr">F.</span> <span dir="ltr">William</span>, <span dir="ltr">Stephanie</span> <span dir="ltr">C.</span> <span dir="ltr">Hicks</span>, <span dir="ltr">Martin</span> <span dir="ltr">J.</span> <span dir="ltr">Aryee</span>, <span dir="ltr">and</span> <span dir="ltr">Rafael</span> <span dir="ltr">A.</span> <span dir="ltr">Irizarry.</span> 2019. «انتخاب ویژگی و کاهش بُعد برای <span dir="ltr">RNA-Seq</span> تک‌سلولی بر پایه یک مدل چندنومیالی.» _<span dir="ltr">Genome</span> <span dir="ltr">Biology_</span> 20 (1): 295. <<span dir="ltr">https://doi.org/10.1186/s13059-019-1861-6</span>> .

<span dir="ltr">Trapnell</span>, <span dir="ltr">Cole</span>, <span dir="ltr">David</span> <span dir="ltr">G</span> <span dir="ltr">Hendrickson</span>, <span dir="ltr">Martin</span> <span dir="ltr">Sauvageau</span>, <span dir="ltr">Loyal</span> <span dir="ltr">Goff</span>, <span dir="ltr">John</span> <span dir="ltr">L</span> <span dir="ltr">Rinn</span>, <span dir="ltr">and</span> <span dir="ltr">Lior</span> <span dir="ltr">Pachter.</span> 2013. «تحلیل تفاضلی تنظیم ژن با دقت رونوشت (<span dir="ltr">transcript</span> (رونوشت)) با استفاده از <span dir="ltr">RNA-seq.</span>» _<span dir="ltr">Nature</span> <span dir="ltr">Biotechnology_.</span> <<span dir="ltr">https://doi.org/10.1038/nbt.2450</span>> .

<span dir="ltr">Wickham</span>, <span dir="ltr">Hadley.</span> 2009. _<span dir="ltr">ggplot2_.</span> <span dir="ltr">New</span> <span dir="ltr">York</span>, <span dir="ltr">NY:</span> <span dir="ltr">Springer</span> <span dir="ltr">New</span> <span dir="ltr">York.</span> <<span dir="ltr">https://doi.org/10.1007/978-0-387-98141-3</span>> .

<span dir="ltr">Witten</span>, <span dir="ltr">Daniela</span> <span dir="ltr">M.</span> 2011. «طبقه‌بندی و خوشه‌بندی داده‌های توالی‌یابی با استفاده از مدل پواسون.» _<span dir="ltr">The</span> <span dir="ltr">Annals</span> <span dir="ltr">of</span> <span dir="ltr">Applied</span> <span dir="ltr">Statistics_</span> 5 (4): 2493–2518. <<span dir="ltr">https://doi.org/10.1214/11-AOAS493</span>> .

<span dir="ltr">Wu</span>, <span dir="ltr">Hao</span>, <span dir="ltr">Chi</span> <span dir="ltr">Wang</span>, <span dir="ltr">and</span> <span dir="ltr">Zhijin</span> <span dir="ltr">Wu.</span> 2013. «یک برآوردگر کوچک‌سازی جدید برای <span dir="ltr">dispersion</span> (پراکندگی)، تشخیص <span dir="ltr">differential</span> <span dir="ltr">expression</span> (تحلیل بیان تفاضلی) را در داده‌های <span dir="ltr">RNA-seq</span> بهبود می‌دهد.» _<span dir="ltr">Biostatistics_</span> 14 (2): 232–43. <<span dir="ltr">https://doi.org/10.1093/biostatistics/kxs033</span>> .

<span dir="ltr">Zhu</span>, <span dir="ltr">Anqi</span>, <span dir="ltr">Joseph</span> <span dir="ltr">G.</span> <span dir="ltr">Ibrahim</span>, <span dir="ltr">and</span> <span dir="ltr">Michael</span> <span dir="ltr">I.</span> <span dir="ltr">Love.</span> 2018. «توزیع‌های پیشین سنگین‌دم برای داده‌های <span dir="ltr">sequence</span> <span dir="ltr">count</span> (شمارش): حذف نویز و حفظ تفاوت‌های بزرگ.» _<span dir="ltr">Bioinformatics_.</span> <<span dir="ltr">https://doi.org/10.1093/bioinformatics/bty895</span>> .
