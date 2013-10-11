<div class='panel panel-default'>
    <div class="panel-heading">Settings</div>  
    <div class="panel-body">
        <div id='dictDiv'>
            <h4>Choose external dictionary (open word)</h4>
            {{#each dictList}}
            <div class='padding-small' style="width:48%; display: inline-block">
                <button type="button" class="btn {{cssClass}} btn-lg btn-block" 
                        onClick="window.localStorage['dictionaryLink']='{{url}}'; return selectButtonInGroup(this, 'dictDiv');" >
                    {{name}}
                </button>
            </div>
            {{/each}}
        </div>
        <div id='speechDiv'>
            <h4>Choose Speech engine (pronunciation)</h4>            
            {{#each speechList}}
            <div class='padding-small' style="width:48%; display: inline-block">
                <button type="button" class="btn {{cssClass}} btn-lg btn-block" 
                        onClick="window.localStorage['speechEngine']='{{name}}'; return selectButtonInGroup(this, 'speechDiv');" >
                    {{name}}
                </button>
            </div>
            {{/each}}
            <div class="col-xs-6 center padding-big">
                <button type="button" class="btn btn-default btn-lg btn-block" 
                        onClick="window.history.back(); return false;" >
                    Save
                </button>
            </div>
        </div>
        <br />
    </div>
</div>

