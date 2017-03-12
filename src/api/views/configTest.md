<?xml version="1.0" encoding="utf-8"?>
<!--
     This configuration file is required if iisnode is used to run node processes behind
     IIS or IIS Express.  For more information, visit:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->

<configuration>
  <system.webServer>
    <!-- Visit http://blogs.msdn.com/b/windowsazure/archive/2013/11/14/introduction-to-websockets-on-windows-azure-web-sites.aspx for more information on WebSocket support -->
    <webSocket enabled="false" />
    <handlers>
      <!-- Indicates that the server.js file is a node.js site to be handled by the iisnode module -->
      <add name="iisnode" path="app.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <!-- Do not interfere with requests for node-inspector debugging -->
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^app.js\/debug[\/]?" />
        </rule>

        <!-- First we consider whether the incoming URL matches a physical file in the /public folder -->
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>

        <!-- All other URLs are mapped to the node.js site entry point -->
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="app.js"/>
        </rule>
      </rules>
    </rewrite>

    <!-- 'bin' directory has no special meaning in node.js and apps can be placed in it -->
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>

    <!-- Make sure error responses are left untouched -->
    <httpErrors existingResponse="PassThrough" />

    <!--
      You can control how Node is hosted within IIS using the following options:
        * watchedFiles: semi-colon separated list of files that will be watched for changes to restart the server
        * node_env: will be propagated to node as NODE_ENV environment variable
        * debuggingEnabled - controls whether the built-in debugger is enabled

      See https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config for a full list of options
    -->
    <!--<iisnode watchedFiles="web.config;*.js"/>-->
  </system.webServer>
</configuration>


<!-- 
     This configuration file is required if iisnode is used to run node processes behind
     IIS or IIS Express.  For more information, visit:

     https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/web.config
-->


<configuration>
    <system.webServer>

        <handlers>
            <!-- indicates that the app.js file is a node.js application to be handled by the iisnode module -->
            <add name="iisnode" path="app.js" verb="*" modules="iisnode" />
        </handlers>
    
        <rewrite>
            <rules>
                <!-- Don't interfere with requests for logs -->
                <rule name="LogFile" patternSyntax="ECMAScript" stopProcessing="true">
                    <match url="^[a-zA-Z0-9_\-]+\.js\.logs\/\d+\.txt$" />
                </rule>

                <!-- Don't interfere with requests for node-inspector debugging -->
                <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">                    
                    <match url="^app.js\/debug[\/]?" />
                </rule>
              
                <!-- First we consider whether the incoming URL matches a physical file in the /public folder -->
                <rule name="StaticContent">
                    <action type="Rewrite" url="public{REQUEST_URI}" />
                </rule>

                <!-- All other URLs are mapped to the Node.js application entry point -->
                <rule name="DynamicContent">
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True" />
                    </conditions>
                    <action type="Rewrite" url="app.js" />
                </rule>
            </rules>
        </rewrite>

        <!-- You can control how Node is hosted within IIS using the following options -->
        <!--<iisnode      
          node_env="%node_env%"
          nodeProcessCommandLine="&quot;%programfiles%\nodejs\node.exe&quot;"
          nodeProcessCountPerApplication="1"
          maxConcurrentRequestsPerProcess="1024"
          maxNamedPipeConnectionRetry="3"
          namedPipeConnectionRetryDelay="2000"      
          maxNamedPipeConnectionPoolSize="512"
          maxNamedPipePooledConnectionAge="30000"
          asyncCompletionThreadCount="0"
          initialRequestBufferSize="4096"
          maxRequestBufferSize="65536"
          watchedFiles="*.js"
          uncFileChangesPollingInterval="5000"      
          gracefulShutdownTimeout="60000"
          loggingEnabled="true"
          logDirectoryNameSuffix="logs"
          debuggingEnabled="true"
          debuggerPortRange="5058-6058"
          debuggerPathSegment="debug"
          maxLogFileSizeInKB="128"
          appendToExistingLog="false"
          logFileFlushInterval="5000"
          devErrorsEnabled="true"
          flushResponse="false"      
          enableXFF="false"
          promoteServerVars=""
         />-->
    
    </system.webServer>
</configuration>