<div class='panel panel-default'>
    <div class="panel-heading">Settings</div>  
    <div class="panel-body">
        <h3>Choose external dictionary</h3>
        <p>
            Choose dictionary to open single word.<br/>
            Please note that diki.pl and getionary.pl apart from speech engine contain sample sentences.            
        </p><br />
        <button type="button" class="btn btn-primary btn-lg btn-block" 
                onClick="window.localStorage['dictionaryLink']=window.learnwordsConfig.diki; app_router.navigate('#', true); return false;" >
                Diki.pl (speech support)
        </button>
        <button type="button" class="btn btn-default btn-lg btn-block" 
                onClick="window.localStorage['dictionaryLink']=window.learnwordsConfig.getionary; app_router.navigate('#', true); return false;" >
                Getionary.pl (speech support) 
        </button>
        <button type="button" class="btn btn-default btn-lg btn-block" 
                onClick="window.localStorage['dictionaryLink']=window.learnwordsConfig.forvo; app_router.navigate('#', true); return false;" >
                Forvo.com (speech support)
        </button>
        <br /><br />
    </div>
</div>

